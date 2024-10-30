# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### This Is a full stack web app ###
 First Run the backend using npm install and npm start.

 Then Run the frontend using npm install and npm start.

 since this contains a .env file , make use to use these in .env files:

 ### For BACKEND .env FIlE ###

#It uses PostgreSQL as a Database, so use credentials of PostgreSQL

  # Server Configuration
PORT=5000
JWT_SECRET=
SOCKET_PORT=5001

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=5432

# Complete PostgreSQL Database URL
DATABASE_URL=


DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432

### For Frontend .env File ###
REACT_APP_API_URL=http://localhost:5000/api
