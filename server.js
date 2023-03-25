// Importing the required dependencies into the application
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initializing the application
const app = express();

// Setting up the port and database connection url
const port = process.env.NODE_APP_PORT || 4000;
const mongoDbURI = `mongodb+srv://admin:${process.env.NODE_DB_CONNECTION_PASSWORD}@cluster0.4e0w61l.mongodb.net/?retryWrites=true&w=majority`;

// Setting up the database with Mongoose
mongoose.connect(mongoDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connecting to the database
const connection = mongoose.connection;

connection.on('open', () => {
  console.log('Connection is set up with MongoDB');
});

// Middleware
app.use(express.json());
app.use(cors());

// Simple get request
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hello World' });
});

// Server started on the required port
app.listen(port, () => {
  console.log(`The port is listening on ${port}`);
});
