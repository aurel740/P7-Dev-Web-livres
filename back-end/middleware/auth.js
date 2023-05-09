/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Token non valide');
    }
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // eslint-disable-next-line prefer-destructuring
    const userId = decodedToken.userId;
    req.auth = {
      // eslint-disable-next-line object-shorthand, key-spacing, comma-dangle
      userId:userId
    };
    console.log('req.auth:', req.auth);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentification nécessaire' });
  }
};
