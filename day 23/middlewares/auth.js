// check if user is authenticated or not
const auth = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(401).json({
      title: "unauthorized",
      message: "please login",
    });

  next();
};

module.exports = auth;
