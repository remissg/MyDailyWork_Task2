# MyDailyWork - Job Application Tracker

MyDailyWork is a full-stack web application designed to help users efficiently track their job applications. It provides a user-friendly interface to add, view, edit, and manage job application details, as well as visualize application statistics.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Populating the Database](#populating-the-database)

## Features

- **User Authentication**: Secure registration and login functionality for users.
- **CRUD Operations**: Create, Read, Update, and Delete job applications.
- **Dashboard**: An overview of all job applications with search and filtering capabilities.
- **Statistics**: View aggregated data and charts for application statuses (e.g., pending, interview, rejected).
- **Filtering**: Filter jobs by status, work type, and sort by date or company.

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend API.
- **Styled-Components**: For styling React components.

### Backend
- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For securing the API and managing user sessions.
- **bcrypt.js**: For hashing user passwords.

## Project Structure

```
/
├── client/         # React Frontend
├── controllers/    # Express route handlers
├── db/             # Database connection setup
├── errors/         # Custom error classes
├── middleware/     # Express middleware (e.g., authentication, error handling)
├── models/         # Mongoose data models
├── routes/         # API routes
├── server.js       # Main backend server file
└── jobs-data.json  # Sample data for populating the database
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mydailywork.git
    cd mydailywork
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd client
    npm install
    ```

4.  **Environment Variables:**
    Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret.
    ```
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Usage

Run the development server, which will start both the backend and frontend concurrently.

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Populating the Database

The `jobs-data.json` file contains sample data that can be used to populate your database. You can create a script to import this data into your MongoDB collection.