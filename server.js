const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// API route
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // Email setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD"
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "YOUR_EMAIL@gmail.com",
      subject: subject || "New Contact Message",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    res.json({ success: true, message: "Message sent!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
