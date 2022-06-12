const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const { id, otp } = req.body;

  try {
    // check if all required credentials are provided
    if (typeof id !== "string" || typeof otp !== "string")
      return res.status(400).json({
        title: "error",
        message: "id and otp is required",
      });

    // check if user exists or not
    const userCount = await prisma.user.count({
      where: {
        id,
      },
    });

    if (userCount == 0) {
      return res.status(400).json({
        title: "error",
        message: "user does not exist",
      });
    }

    // check if user if already verified
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user.active === true)
      return res.status(400).json({
        title: "error",
        message: "user is already verified",
      });

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      title: "internal server error",
    });
  }
};
