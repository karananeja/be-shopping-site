const connectDB = require('../mongodb/connect');
const { environment } = require('../utils/constants');

module.exports = async function dbMiddleware(_, __, next) {
  try {
    const mongoDbURI = `mongodb+srv://admin:${environment.DB_PASSWORD}@cluster0.4e0w61l.mongodb.net/${environment.DB_NAME}?retryWrites=true&w=majority`;

    await connectDB(mongoDbURI);
    next();
  } catch (err) {
    next(err);
  }
};
