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
- [Screenshots](#screenshots)
- [Contributing](#contributing)
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

`````bash
node -v
npm -v

### 2. **Clone the Repository**

```bash
git clone https://github.com/your-username/intelli-share.git
cd intelli-share/backend


### 3. **Install Dependencies**

````bash
npm install

### 4. **Environment Variables**

Create a `.env` file in the `backend` directory and configure the following variables:

````bash
PORT=5000
NODE_ENV=development

### 5. **Run the Backend**
To start the backend server:

````bash
npm run start

The backend will run on http://localhost:5000

### 6. **Available Scripts**

| Command        | Description                                    |
|----------------|------------------------------------------------|
| `npm start`    | Start the server in production mode            |
| `npm run dev`  | Start the server in development mode with nodemon |
| `npm run test` | Run backend tests                              |

`````
