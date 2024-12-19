const jwt = require("jsonwebtoken");

module.exports = (req, _, next) => {
  let token = req.header("x-auth-token");
  if (!token) {
    let error = new Error("Invalid token");
    error.status = 401;
    return next(error);
  }

  try {
    let userId = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch (_) {
    let error = new Error("Invalid token");
    error.status = 401;
    return next(error);
  }
};
