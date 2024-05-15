const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    String(req.headers.authorization).startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    if (!token) {
      res.status(400).send("User not authorized");
    }
  }
};

module.exports = { protect };
