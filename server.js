// Importing the required dependencies into the application
const express = require('express');
const cors = require('cors');
const connectDB = require('./mongodb/connect');
const { environment, corsOptions } = require('./utils/constants');
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

// Restrict all miscellaneous routes
app.get('*', (_, res) => {
  res.status(404).json({
    status: 404,
    msg: 'Not Found',
    error: 'The resource you requested does not exist.',
  });
});

// Global Error catch handler
app.use(errorHandler);

// Server started on the required port
app.listen(port, () => {
  console.log(`[server]: The port is listening on ${port}`);
  // Connecting to the database
  connectDB(mongoDbURI);
});
