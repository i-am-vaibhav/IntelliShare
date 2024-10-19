require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); 
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const authenticateToken = require('../validator.js');
const fetchRecommendations = require('../recommendation_handler.js');

const app = express();
const db = new sqlite3.Database(':memory:');

// Configure Winston logger
const { createLogger, format, transports } = winston;

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'server.log' })
    ]
});

app.use(cors());
app.use(bodyParser.json());

// Initialize the in-memory database
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, preferences TEXT, learningStyle TEXT,CONSTRAINT unique_username UNIQUE (username) )");
  db.run("CREATE TABLE content (id INTEGER PRIMARY KEY, title TEXT,description TEXT, contentURL TEXT, authorId INTEGER)");
  logger.info("Database initialized and tables created.");
});


// User registration
app.post('/register', (req,res) => {
    const {userName, password, preferences, learningStyle} = req.body;
    logger.info(`Registering user : ${userName}`);

    const hashedPassword = bcrypt.hashSync(password,10);
    db.run("INSERT INTO users (username, password, preferences, learningStyle) VALUES (?, ?, ?, ?)",
      [userName, hashedPassword, preferences, learningStyle], function (err) {
          if (err) {
              logger.error(`Error registering user : ${err.message}`);
              return res.status(400).json({ message: "Error registering user" });
          }
          logger.info(`User ${userName} registered successfully`);
          res.status(201).json({ message: "User registered successfully" });
      });
});

// User login
app.post('/login', (req,res) => {
    const {userName, password} = req.body;
    logger.info(`Attempting login for user: ${userName}`);
    db.get("SELECT * FROM users WHERE username = ?", [userName], (err, user) => {
      if (err || !user || !bcrypt.compareSync(password,user.password)) {
        logger.error(`Login failed for user : ${userName}`);
        return res.status(401).json({message:"Invalid credentials"});
      }
      logger.info(`User ${userName} logged in successfully`);
      const token = jwt.sign({userId : user.id}, process.env.SECRET_KEY);
      res.status(200).json({token, userId : user.id});
    });
});

// Get User By UserId
app.get('/user/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId;
  logger.info(`Getting user for user Id : ${userId}`);
  try {
      // Find the user in the database 
      db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, user) => {
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        logger.info(`Getting user successfully for user Id : ${user.id}`);
        res.status(200).json(user);
      });
  } catch (err) {
      logger.error(`Error getting user: ${err.message}`);
      res.status(500).json({ success: false, message: 'Error getting user' });
  }
});

// User Profile Update
app.post('/user/update', authenticateToken, async (req, res) => {
  const { userId, preferences, learningStyle } = req.body;
  logger.info(`Updating user profile for user Id : ${userId}`);
  try {
      // Find the user in the database and update their preferences and learning pattern
      const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      // Update the user data
      await db.run(`UPDATE users SET preferences = ?, learningStyle = ? WHERE id = ?`, 
          [preferences, learningStyle, userId]);

      logger.info(`Updated user profile successfully for user Id : ${userId}`);
      res.json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
      logger.error(`Error updating profile: ${err.message}`);
      res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});

// Upload Content
app.post('/content/upload',authenticateToken, (req,res) => {
    const {title, description, contentURL, authorId} = req.body;
    logger.info(`Uploading content: ${title} by user Id : ${authorId}`);
    db.run("INSERT INTO content (title, description, contentURL, authorId) VALUES (?,?,?,?)",[title,description,contentURL,authorId], (err) => {
      if(err){
        logger.error(`Error uploading content : ${err.message}`);
        return res.status(400).json({message:"Error uploading content"});
      }
      logger.info(`Content "${title}" uploaded successfully by user Id : ${authorId}`);
      res.status(201).json({message:"Content uploaded successfully"});
    });
});

// Get Recommendations
app.get('/content/recommendations/:userId/:size',authenticateToken,async (req,res) => {
    const userId = req.params.userId;
    const size = req.params.size;
    logger.info(`Fetching content recommendations for user ID : ${userId}`);

    db.get(`SELECT * FROM users WHERE id = ?`, [userId], async (err, user) => {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      logger.info(`Content recommendations sent to user ID : ${user.id}`);
      const recommendations = await fetchRecommendations(user.preferences, user.learningStyle, size);

      res.status(200).json({ recommendations });
    });
});

// Get Posts By Preferences and Learning Style
app.post('/contents', authenticateToken, (req,res) => {
  const {preferences, learningStyle, userId} = req.body;
  logger.info(`Get content by preferences = ${preferences} and learningStyle = ${learningStyle} for userId : ${userId}`);
  try {
    db.all(`SELECT content.*  FROM content WHERE (content.title LIKE '%' || ? || '%' OR  content.description LIKE '%' || ? || '%' OR content.title LIKE '%' || ? || '%' OR content.description LIKE '%' || ? || '%') and content.authorId != ?`, 
      [preferences, preferences,learningStyle, learningStyle, userId], (err, rows) => {
        if (err) {
          logger.error(`Error fetching content for user ID : ${userId} - ${err.message}`);
          return res.status(400).json({message:"Error fetching content"});
        }
        logger.info(`Content sent to user ID : ${userId}`);
        res.json(rows);
    });
  } catch (err) {
    logger.error(`Error getting content: ${err.message}`);
    res.status(500).json({ success: false, message: `Error getting content : ${err.message}` });
  }
});

// Fetch Content
app.get('/content/:userId',authenticateToken, (req,res) => {
  const userId = req.params.userId;
  logger.info(`Fetching content for user ID : ${userId}`);

  if (!userId) {
    return res.status(400).json({message:"User ID is required"});
  }

  db.all("SELECT * FROM content WHERE authorId = ?", [userId], (err,rows) => {
    if (err) {
      logger.error(`Error fetching content for user ID : ${userId} - ${err.message}`);
      return res.status(400).json({message:"Error fetching content"});
    }
    logger.info(`Content sent to user ID : ${userId}`);
    res.json(rows);
  });
});

// Delete Content By contentId
app.get('/content/delete/:contentId', authenticateToken, async (req, res) => {
  const contentId = req.params.contentId;
  logger.info(`Deleting content by content Id : ${contentId}`);
  try {
      // Delete the user in the database 
      await db.run(`DELETE FROM content WHERE id = ?`, [contentId]);

      logger.info(`Deleted content successfully for content Id : ${contentId}`);
      res.status(200).json({ success: true, message:"Deleted content successfully"});
  } catch (err) {
      logger.error(`Error deleting user: ${err.message}`);
      res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

module.exports = {app, db};