const initialProductCheck = (req, res, next) => {
  const { name, price, userId } = req.body;

  // null handling
  if (
    typeof name !== "string" ||
    typeof price !== "number" ||
    typeof userId !== "number"
  )
    return res.status(400).json({
      title: "error",
      message: "name, price and userId cannot be null",
    });

  // price handler
  if (parseInt(price) <= 0) {
    return res.status(400).json({
      title: "error",
      message: "price cannot be negative or zero",
    });
  }

  if (name.length < 3)
    return res.status(400).json({
      title: "error",
      message: "length of name should be greater than 3",
    });

  next();
};

module.exports = initialProductCheck;
