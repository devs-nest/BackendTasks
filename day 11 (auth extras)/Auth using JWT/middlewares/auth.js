const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId });

    // check if the user has logged in or not.
    if (user.token === " ")
      return res.status(401).json({
        title: "error",
        message: "Unauthorized",
      });

    req.id = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      title: "error",
      message: "Unauthorized",
    });
  }
};

module.exports = auth;
