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
const sendResetPasswordMail = (link, email) => {
  transport.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Your Password",
    html: `<h1>Reset Password</h1>
        <p>Reset your password by clicking on the link below.</p>
        <a href=${link}>Click here</a>
    `,
  });
};

module.exports = { sendResetPasswordMail };
