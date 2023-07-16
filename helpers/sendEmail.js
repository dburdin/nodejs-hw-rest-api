const nodemailer = require("nodemailer");

const { GMAIL_LOGIN, GMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_LOGIN,
    pass: GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: GMAIL_LOGIN };

  transporter
    .sendMail(email)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.log("error with sending email", error.message));
};

module.exports = sendEmail;
