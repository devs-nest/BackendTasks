const ObjectId = require("mongoose").Types.ObjectId;

const deleteUserCheck = (req, res, next) => {
  const id = req.params.id;

  //   check if id is valid or not
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ title: "error", message: "Invalid user id" });

  //   check if authenticated user is super-admin

  next();
};

module.exports = deleteUserCheck;
