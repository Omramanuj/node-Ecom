const jwt = require('jsonwebtoken');
const db = require('../database/index'); 


const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, process.env.secretKey);

    const user = await db.users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).send("Authentication failed.");
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid token.");
  }
};

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
  const decoded = jwt.verify(token, process.env.secretKey);

  if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = { authenticateUser, isAdmin };
