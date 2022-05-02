const passport = require("passport");

// login user with given credentials
const authorize = (req, res, next) => {
  passport.authenticate("local")(req, res, next);
};

module.exports = authorize;
