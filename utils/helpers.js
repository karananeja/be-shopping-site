const responseStructure = ({ data = {}, res, statusCode = 200 }) =>
  res.status(statusCode).json({ data });

module.exports = responseStructure;
