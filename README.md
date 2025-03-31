# Task Manager Server

A Node.js and Express-based API for managing tasks and users with authentication.

## **Table of Contents**
- [Setup](#setup)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Architectural Decisions](#architectural-decisions)

## **Setup**
1. Clone the repository:
    ```
    git clone https://github.com/edenmarom/Task-Manager-Server.git
    ```

2. Install dependencies:
    ```
    npm install
    ```

## **Database Setup**
DB: MongoDB (Atlas).

no setup required.

## **Running the Server**
    ```
    npm run start
    ```

## **API Documentation**
The API is documented using Swagger.

To view the API docs:
1. Start the server.
2. Open http://localhost:3000/api-docs in your browser.

## **Architectural Decisions**
- Node.js + Express: Chosen for its lightweight nature and extensive middleware ecosystem.
- MongoDB + Mongoose: Provides flexibility and schema validation for dynamic data.
- JWT Authentication: Ensures secure API access.
- Swagger Integration: Helps document and test API endpoints.