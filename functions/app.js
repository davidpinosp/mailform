const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const cors = require("cors");
const router = express.Router();
const app = express();
// const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service of your choice
  auth: {
    user: process.env.Email, // Your email address
    pass: process.env.Email_Password, // Your email password or app-specific password
  },
});

router.get("/", async (req, res) => {
  res.json({ hole: "holis" });
});

// API endpoint to send an email

router.post("/send-email", async (req, res) => {
  try {
    const { subject, text } = req.body;

    // Send email using the transporter
    await transporter.sendMail({
      from: process.env.Email, // Your email address
      to: process.env.Destination,
      subject,
      text,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
});

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
