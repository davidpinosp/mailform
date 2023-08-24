require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service of your choice
  auth: {
    user: process.env.Email, // Your email address
    pass: process.env.Email_Password, // Your email password or app-specific password
  },
});

// API endpoint to send an email
app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Send email using the transporter
    await transporter.sendMail({
      from: process.env.Email, // Your email address
      to,
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
