const router = require("express").Router();
const passport = require("passport");

// middlewares
const registerCheck = require("../middlewares/registerCheck");
const loginCheck = require("../middlewares/loginCheck");
const deleteUserCheck = require("../middlewares/deleteUserCheck");
const {
  isAdminOrSuperAdmin,
  isSuperAdmin,
} = require("../middlewares/checkRole");

// controllers
const registerUser = require("../controllers/registerUser");
const showUser = require("../controllers/showUser");
const deleteUser = require("../controllers/deleteUser");
const loginUser = require("../controllers/loginUser");
const logoutUser = require("../controllers/logoutUser");

// to get data of all users only if admin or super-admin is logged in
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdminOrSuperAdmin,
  showUser
);

// to register an user
router.post("/register", registerCheck, registerUser);

// authenticate an user
router.post("/login", loginCheck, loginUser);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutUser
);

// to delete any user if super-admin is logged in
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isSuperAdmin,
  deleteUserCheck,
  deleteUser
);

module.exports = router;
