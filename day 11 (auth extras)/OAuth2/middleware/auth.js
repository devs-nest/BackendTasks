// check if user is authenticated
const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

module.exports = {
  auth,
};
