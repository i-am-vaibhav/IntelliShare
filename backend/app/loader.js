const bcrypt = require('bcrypt');

const load = (db) => {
    // Hash password once
    const hashedPassword = bcrypt.hashSync('password123', 10);

    // Insert 5 users with topic-based preferences
    db.serialize(() => {
        db.run(`
          INSERT INTO users (username, password, preferences, learningStyle)
          VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)
        `, 
        [
          'alice', hashedPassword, 'JavaScript', 'visual',
          'bob', hashedPassword, 'Docker', 'auditory',
          'charlie', hashedPassword, 'Cloud', 'kinesthetic',
          'diana', hashedPassword, 'CSS', 'visual',
          'edward', hashedPassword, 'Security', 'auditory'
        ]);

        // Insert posts for each user (2-3 posts per user)
        db.run(`
          INSERT INTO content (title, description, contentURL, authorId)
          VALUES 
          ('Understanding JavaScript Closures', 'A deep dive into closures in JavaScript', 'https://example.com/js-closures', 1),
          ('Mastering CSS Grid', 'Learn how to layout webpages with CSS Grid', 'https://example.com/css-grid', 1),
          ('Intro to Docker', 'How to containerize applications with Docker', 'https://example.com/docker-intro', 2),
          ('Building REST APIs with Express', 'Learn how to build RESTful services using Express', 'https://example.com/express-rest', 2),
          ('Cloud Basics with AWS', 'An introduction to AWS cloud services', 'https://example.com/aws-basics', 3),
          ('Building Microservices with Spring Boot', 'A comprehensive guide to building microservices', 'https://example.com/spring-boot-microservices', 3),
          ('Responsive Web Design', 'How to make your website responsive with CSS', 'https://example.com/responsive-web-design', 4),
          ('Testing with Jest', 'Learn how to write unit tests in JavaScript using Jest', 'https://example.com/jest-testing', 4),
          ('Securing Web Applications', 'Best practices for securing your web applications', 'https://example.com/web-security', 5),
          ('Version Control with Git', 'How to use Git for version control', 'https://example.com/git-version-control', 5),
          ('Introduction to React', 'Getting started with React for building UI components', 'https://example.com/react-intro', 5)
        `);

        console.log('Database initialized with 5 users and 2-3 posts each.');
        console.log(`usernames loaded => 'alice','bob','charlie','diana','edward' with password => 'password123'`);
    });
};

module.exports = { load };
