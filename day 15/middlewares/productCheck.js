const productCheck = (req, res, next) => {
  const { name, manufacturedBy, price, quantityAvailable } = req.body;

  if (
    typeof name !== "string" ||
    typeof manufacturedBy !== "string" ||
    typeof price !== "number" ||
    typeof quantityAvailable !== "number"
  )
    return res
      .status(400)
      .json({ title: "error", message: "Invalid credential datatype" });

  if (price < 0)
    return res
      .status(400)
      .json({ title: "error", message: "Price cannot be negative" });

  if (quantityAvailable < 0)
    return res
      .status(400)
      .json({ title: "error", message: "Quantity cannot be negative" });

  next();
};

module.exports = productCheck;
