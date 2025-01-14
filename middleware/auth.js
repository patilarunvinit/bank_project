const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; 

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    
    if (req.originalUrl.includes('/hr') && user.role !== 'hr') {
      return res.status(403).send('Access Denied: Only HR can access this resource');
    }
    
    next();
  });
};

module.exports = authenticateToken;