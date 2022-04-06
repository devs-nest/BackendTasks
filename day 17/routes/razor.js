const router = require("express").Router();
const path = require("path");
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/razor.html"));
});

router.post("/create/orderId", (req, res) => {
  const options = {
    amount: req.body.price,
    currency: "INR",
  };
  instance.orders.create(options, (err, order) => {
    if (err) return console.log(err);
    res.send({ orderId: order.id });
  });
});

router.post("/api/payment/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_ID)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
});

module.exports = router;
