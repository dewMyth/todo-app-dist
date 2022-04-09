const jwt = require("jsonwebtoken");

//Check whether the user has correct token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECURITY_KEY, (err, user) => {
      if (err) res.status(401).json("Token is not valid!");

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

//Check whether the user has correct token and authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(401).json("You are not authorized!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
