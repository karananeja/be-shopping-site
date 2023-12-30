// Importing the required dependencies into the application
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./mongodb/connect');
const { environment } = require('./utils/constants');
const errorHandler = require('./middlewares/errorMiddleware');

// Initializing the application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Importing the route files
const usersSignUpRouter = require('./routes/signup');
const usersSignInRouter = require('./routes/signin');
const userDetailsRouter = require('./routes/users');
const utils = require('./routes/utils');

// API endpoints
app.use('/api/v1', usersSignUpRouter);
app.use('/api/v1', usersSignInRouter);
app.use('/api/v1', userDetailsRouter);
app.use('/api/v1', utils);

// Setting up the port and database connection url
const port = environment.APP_PORT || 5000;
const mongoDbURI = `mongodb+srv://admin:${environment.DB_PASSWORD}@cluster0.4e0w61l.mongodb.net/${environment.DB_NAME}?retryWrites=true&w=majority`;

// Connecting to the database
connectDB(mongoDbURI);

// Restrict all miscellaneous routes
app.get('*', (_, res) => res.status(404).send('Not found'));

// Global Error catch handler
app.use(errorHandler);

// Server started on the required port
app.listen(port, () => console.log(`The port is listening on ${port}`));
