const nodemailer = require("nodemailer");

// setup transport for nodemailer
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

// send mail to user
const sendVerificationEmail = (email, confirmationCode) => {
  transport.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Please confirm your Account",
    html: `<h1>Account Confirmation</h1>
        <p>Thank you for subscribing. Please confirm your account by clicking on the link below.</p>
        <a href=http://localhost:8080/user/confirm/${confirmationCode}>Click here</a>
    `,
  });
};

module.exports = { sendVerificationEmail };
