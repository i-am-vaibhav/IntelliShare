require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); 
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const authenticateToken = require('./validator.js');

const app = express();
const PORT = process.env.PORT || 3000;
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
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT,password TEXT, preferences TEXT, learningStyle TEXT)");
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
app.get('/content/recommendations/:userId',authenticateToken, (req,res) => {
    const userId = req.params.userId;
    logger.info(`Fetching content recommendations for user ID : ${userId}`);
    db.all("SELECT * FROM content WHERE authorId != ?", [userId], (err,rows) => {
      if (err) {
        logger.error(`Error fetching content recommendations for user ID : ${userId} - ${err.message}`);
        return res.status(400).json({message:"Error fetching recommendations"});
      }
      logger.info(`Content recommendations sent to user ID : ${userId}`);
      res.json(rows);
    });
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
    logger.info(`Content recommendations sent to user ID : ${userId}`);
    res.json(rows);
  });
}); 


// Configuring the app to listen on PORT
app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
});