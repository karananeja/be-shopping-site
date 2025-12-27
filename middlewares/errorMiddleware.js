const fs = require('fs');
const path = require('path');
const { errMessages } = require('../utils/constants');
const responseStructure = require('../utils/helpers');

function errorHandler(error, req, res, next) {
  if (!error) return next();

  const logEntry = {
    time: new Date().toISOString(),
    message: `${error.name}: ${error.message}`,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
  };

  if (process.env.NODE_ENV !== 'production') {
    try {
      const filePath = path.join(__dirname, '..', 'errorLogs.json');

      let logs = [];
      if (fs.existsSync(filePath)) {
        logs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }

      logs.push(logEntry);

      fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
    } catch (fsError) {
      console.error('Failed to write local error log:', fsError);
    }
  }

  console.error(logEntry);

  responseStructure({
    res,
    statusCode: 500,
    data: errMessages.INTERNAL_SERVER_ERROR,
  });
}

module.exports = errorHandler;
