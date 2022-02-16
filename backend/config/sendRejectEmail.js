const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const sendRejectEmail = async (email) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: email, // List of recipients
    subject: "Approval status for Pollice Election Hosting", // Subject line
    text: `Hello People!, Thanks for choosing Pollice! We are sorry to inform you that your election hosting request can't be fullfilled. To know reasons reply "REASON" to this email.`, // Plain text body
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  return true;
};

module.exports = sendRejectEmail;
