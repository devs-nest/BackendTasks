const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // get bearer token from headers
  const authorization = req.headers["authorization"];

  // check if authorization is provided
  if (!authorization)
    return res.status(400).json({
      title: "error",
      message: "bearer token is not provided",
    });

  try {
    // verify the jwt token
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    // check if user has logged in with valid recent token
    if (user.token !== token)
      return res.status(401).json({
        title: "Unauthorized",
      });

    req.id = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};
