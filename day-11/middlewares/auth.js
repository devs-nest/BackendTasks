const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (user.token !== token)
        return res.status(400).json({
          title: "error",
          message: "unauthorized",
        });

      req.id = decoded.id;

      next();
    } catch (err) {
      res.status(500).json({
        title: "internal server error",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};
