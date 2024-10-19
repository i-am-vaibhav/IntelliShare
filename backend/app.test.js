const request = require('supertest');
const { app } = require('./app/app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose(); 

// Mock JWT for testing
jest.mock('jsonwebtoken');

describe('IntelliShare API Tests', () => {

  const insertUser = (username, password, preferences, learningStyle) => {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO users (username, password, preferences, learningStyle) VALUES (?, ?, ?, ?)", 
      [username, password, preferences, learningStyle], function (err) {
        if (err) return reject(err);
        resolve(this.userId);
      });
    });
  };

  // Reset the database before each test
  beforeEach(done => {
    db.serialize(() => {
      db.run("DELETE FROM users");
      db.run("DELETE FROM content");
      done();
    });
  });


  const db = new sqlite3.Database(':memory:');
  beforeAll(done => {
    db.serialize(() => {
      db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, preferences TEXT, learningStyle TEXT,CONSTRAINT unique_username UNIQUE (username) )");
      db.run("CREATE TABLE content (id INTEGER PRIMARY KEY, title TEXT,description TEXT, contentURL TEXT, authorId INTEGER)");
      done();
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });  

  // User registration test
  it('should register a user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        userName: 'testuser',
        password: 'password123',
        preferences: 'AI, ML',
        learningStyle: 'Visual'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  // User login test
  it('should login a user with valid credentials', async () => {
    // Insert user manually to test login
    const hashedPassword = bcrypt.hashSync('password123', 10);
    const userId = await insertUser('testuser', hashedPassword, 'AI, ML', 'Visual');
    
    const res = await request(app)
      .post('/login')
      .send({
        userName: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId');
  });

  // User login test with invalid credentials
  it('should not login a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        userName: 'wronguser',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  // Content upload test
  it('should allow a logged-in user to upload content', async () => {
    const hashedPassword = bcrypt.hashSync('password123', 10);
    const userId = await insertUser('testuser', hashedPassword, 'AI, ML', 'Visual');
      
    // Mock JWT verification for this test
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId }));

    request(app)
      .post('/content/upload')
      .set('Authorization', `Bearer mock-token`)
      .send({
        title: 'Learning AI',
        description: 'AI content description',
        contentURL: 'http://content.com/ai',
        authorId: userId
      })
      .expect(201)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Content uploaded successfully');
        done();
      });
    
  });

  it('should return user data for valid userId', async () => {
    const hashedPassword = bcrypt.hashSync('password123', 10);
    const userId = await insertUser('testuser', hashedPassword, 'AI, ML', 'Visual');
    
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId }));
  
    const response = await request(app)
      .get(`/user/1`) // Use the correct userId
      .set('Authorization', `Bearer mock-token`);
  
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("testuser");
  });
  

  it('should return error for non-existing userId', async () => {
    const userId = 1;
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId }));

    const response = await request(app)
      .get('/user/999') // Non-existing ID
      .set('Authorization', `Bearer mock-token`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it('should update user profile successfully', async () => {
    const hashedPassword = bcrypt.hashSync('password123', 10);
    const userId = await insertUser('testuser', hashedPassword, 'AI, ML', 'Visual');
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId }));

    request(app)
      .post('/user/update')
      .set('Authorization', `Bearer mock-token`)
      .send({ userId: 1, preferences: 'math', learningStyle: 'auditory' })
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
        done();
      });
  });

  it('should fetch recommendations for a valid userId', async () => {
    const hashedPassword = bcrypt.hashSync('password123', 10);
    const userId = await insertUser('testuser', hashedPassword, 'AI, ML', 'Visual');
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, { userId }));

    const response = await request(app)
      .get('/content/recommendations/1') // Assuming user ID is 1
      .set('Authorization', `Bearer mock-token`);

    expect(response.status).toBe(200);
    expect(response.body.recommendations).toBeDefined();
  });
});

