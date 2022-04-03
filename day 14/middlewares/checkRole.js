const isAdminOrSuperAdmin = (req, res, next) => {
  if (req.user.role == "admin" || req.user.role == "super-admin") return next();

  return res
    .status(403)
    .json({ title: "error", message: "needs to be admin or super-admin" });
};

const isSuperAdmin = (req, res, next) => {
  if (req.user.role == "super-admin") return next();

  return res
    .status(403)
    .json({ title: "error", message: "user needs to be super-admin" });
};

module.exports = { isAdminOrSuperAdmin, isSuperAdmin };
