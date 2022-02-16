const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

dotenv.config();

const sendEmail = async (email) => {
  const hash = await bcrypt.hash(email, 13);
  const privateKey = crypto
    .createHash("sha256")
    .update(crypto.randomBytes(20))
    .digest("hex");

  var key = hash + privateKey;

  function getRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  function shuffle(s) {
    var arr = s.split(""); // Convert String to array
    var n = arr.length; // Length of the array

    for (var i = 0; i < n - 1; ++i) {
      var j = getRandomInt(124); // Get random of [0, n-1]

      var temp = arr[i]; // Swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
    }

    s = arr.join(""); // Convert Array to string
    return s; // Return shuffled string
  }

  key = shuffle(key);

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
    subject: "Approval confirmation for Pollice Election Hosting", // Subject line
    text: `Hello People!, Welcome to Pollice! You are approved to host an election on our platform. Your private key is ${key}. Use the url "http://localhost:3004/" to get access to hosting panel. Please keep in mind that sharing your private key will cause fradulent.`, // Plain text body
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  return key;
};

module.exports = sendEmail;
