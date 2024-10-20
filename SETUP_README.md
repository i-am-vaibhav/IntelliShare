# **IntelliShare - Content Sharing Platform**

### Overview

IntelliShare is a content-sharing platform that adapts to user preferences and learning styles. This application allows users to register, log in, upload content, and view personalized recommendations. The platform uses a React frontend and an Express backend, with SQLite as the database for storage.

---

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [Contact](#contact)
- [License](#license)

---

## **Features**

- User authentication and profile management
- Content upload (title, description, and content URL)
- Personalized content recommendations
- SQLite used as an in-memory database
- Seamless integration between frontend and backend

---

## **Tech Stack**

**Frontend:**

- React
- Material-UI for UI/UX
- Axios for HTTP requests

**Backend:**

- Node.js
- Express.js
- SQLite as in-memory database
- Winston for logging

---

## **Backend Setup**

### 1. **Requirements**

Ensure you have Node.js and npm installed:

```bash
node -v
npm -v
```

### 2. **Clone the Repository**

```bash
git clone https://github.com/your-username/intelli-share.git
cd intelli-share/backend
```

### 3. **Install Dependencies**

```bash
npm install
```

### 4. **Environment Variables**

Create a `.env` file in the `backend` directory and configure the following variables:

```bash
PORT=3000
SECRET_KEY=IntelliShare-Secret-Key
HF_API_KEY=Your-HuggingFace-Key
```

### 5. **Run the Backend**

To start the backend server:

```bash
npm run start
```

The backend will run on http://localhost:5000

### 6. **Available Scripts**

| Command     | Description       |
| ----------- | ----------------- |
| `npm start` | Start the server  |
| `npm test`  | Run backend tests |

## **Frontend Setup**

### 1. **Requirements**

Ensure you have Node.js and npm installed:

```bash
node -v
npm -v
```

### 2. **Clone the Repository**

```bash
git clone https://github.com/your-username/intelli-share.git
cd intelli-share/frontend
```

### 3. **Install Dependencies**

```bash
npm install
```

### 4. **Environment Variables**

Create a `.env` file in the `frontend` directory and configure the following variables:

```bash
VITE_BACKEND_SERVER_URL=http://localhost:3000
```

### 5. **Run the Frontend**

To start the frontend:

```bash
npm run dev
```

The frontend will run on http://localhost:3000

### 6. **Available Scripts**

| Command         | Description               |
| --------------- | ------------------------- |
| `npm run dev`   | Run dev server            |
| `npm run build` | Run production ready code |

## **API Endpoints**

### 1. **Register a New User**

- **URL:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "userName": "testuser",
    "password": "password123",
    "preferences": "Technology, AI",
    "learningStyle": "Visual"
  }
  ```
- **Responses:**
  - `201`: User registered successfully.
  - `400`: Error registering user.

### 2. **User Login**

- **URL:** `/login`
- **Method:** `POST`
- **Description:** Authenticates a user using username and password.
- **Request Body:**
  ```json
  {
    "userName": "testuser",
    "password": "password123"
  }
  ```
- **Responses:**
  - `200`: Successful login.
  - `401`: Invalid credentials.

### 3. **Get User by ID**

- **URL:** `/user/{userId}`
- **Method:** `GET`
- **Description:** Retrieves a user by their ID.
- **Path Parameters:**
  - `userId` (required): ID of the user to retrieve.
- **Responses:**
  - `200`: User data returned successfully.
  - `404`: User not found.
  - `500`: Error getting user.

### 4. **Update User Profile**

- **URL:** `/user/update`
- **Method:** `POST`
- **Description:** Updates user profile including preferences and learning style.
- **Request Body:**
  ```json
  {
    "userId": 1,
    "preferences": "AI, Machine Learning",
    "learningStyle": "Auditory"
  }
  ```
- **Responses:**
  - `200`: Profile updated successfully.
  - `404`: User not found.
  - `500`: Error updating profile.

### 5. **Upload Content**

- **URL:** `/content/upload`
- **Method:** `POST`
- **Description:** Allows users to upload content.
- **Request Body:**
  ```json
  {
    "title": "Introduction to AI",
    "description": "A comprehensive guide to Artificial Intelligence",
    "contentURL": "https://content-link.com",
    "authorId": 1
  }
  ```
- **Responses:**
  - `201`: Content uploaded successfully.
  - `400`: Error uploading content.

### 6. **Get Content Recommendations**

- **URL:** `/content/recommendations/{userId}/{size}`
- **Method:** `GET`
- **Description:** Fetches content recommendations based on user preferences.
- **Path Parameters:**
  - `userId` (required): ID of the user.
  - `size` (required): Number of recommendations to return.
- **Responses:**
  - `200`: Recommendations fetched successfully.
  - `404`: User not found.
  - `500`: Error fetching recommendations.

### 7. **Get Posts by Preferences and Learning Style**

- **URL:** `/contents`
- **Method:** `POST`
- **Description:** Fetches posts based on user preferences and learning style.
- **Request Body:**
  ```json
  {
    "preferences": "Technology",
    "learningStyle": "Visual",
    "userId": 1
  }
  ```
- **Responses:**
  - `200`: Posts fetched successfully.
  - `400`: Error fetching posts.
  - `500`: Server error.

### 8. **Fetch Content by User ID**

- **URL:** `/content/{userId}`
- **Method:** `GET`
- **Description:** Fetches all content posted by a specific user.
- **Path Parameters:**
  - `userId` (required): ID of the user.
- **Responses:**
  - `200`: Content fetched successfully.
  - `400`: Error fetching content.

### 9. **Delete Content by ID**

- **URL:** `/content/delete/{contentId}`
- **Method:** `GET`
- **Description:** Deletes content by its ID.
- **Path Parameters:**
  - `contentId` (required): ID of the content to delete.
- **Responses:**
  - `200`: Content deleted successfully.
  - `500`: Error deleting content.

## **Frontend Routes**

- **Landing Page**: Accessible via `/`, this is the entry point of the application.
- **Register**: Users can register by navigating to `/register`.
- **Login**: The login page is available at `/login`.
- **Intelli-Share**: This is a protected route that serves as a parent for several sub-routes, ensuring that only authenticated users can access its content.

### **Sub-Routes under Intelli-Share**

- **Home Page**: Available at `/intelli-share/`, this route displays the main content for authenticated users.
- **Feed**: Users can view content feeds at `/intelli-share/feed`.
- **Upload Post**: The upload functionality can be accessed via `/intelli-share/upload`.
- **Posts**: A dedicated route for viewing user posts is available at `/intelli-share/posts`.
- **Profile**: Users can view and edit their profiles at `/intelli-share/profile`.

## **Contact**

For support or inquiries, reach out to our support team:

- **Email:** [vg566556@gmail.com](mailto:vg566556@gmail.com)

## **License**

This API is provided under the MIT license.
