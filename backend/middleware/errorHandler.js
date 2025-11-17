module.exports = (err, req, res, next) => {
  console.error(err);
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(v => v.message);
    return res.status(400).json({ error: messages.join(', ') });
  }
  if (err.code && err.code === 11000) { // duplicate key
    return res.status(409).json({ error: 'Duplicate value error' });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server Error' });
};
