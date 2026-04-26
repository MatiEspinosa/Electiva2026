const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized - Invalid token provided",
    });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    console.log(verified);
    req.user = verified;
    next();
  } catch (error) {
    console.log("Entro en este ");
    
    res.status(401).json({
      message: "Unauthorized - Invalid token provided",
    });
  }
};

module.exports = authMiddleware;
