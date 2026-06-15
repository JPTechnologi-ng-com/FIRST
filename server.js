const express = require("express");
const path = require("path");
const posts = require("./data/posts.json");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || undefined,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("New contact submission:", { name, email, subject, message });

  if (!name || !email || !message) {
    return res.status(400).json({ status: "error", message: "Please fill in name, email, and message." });
  }

  // If SMTP is not configured, just log and return success (developer can configure SMTP in .env)
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP not configured - contact messages will not be emailed. Set SMTP_* env vars to enable email sending.");
    return res.json({ status: "success", message: "Thanks! Your message was received (email not configured)." });
  }

  const mail = {
    from: process.env.FROM_ADDRESS || `"${name}" <${email}>`,
    to: process.env.TO_ADDRESS || process.env.FROM_ADDRESS,
    subject: subject || `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p>From: <strong>${name}</strong> &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br>")}</p>`,
  };

  try {
    await transporter.sendMail(mail);
    return res.json({ status: "success", message: "Thanks! Your message has been sent." });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ status: "error", message: "Failed to send message." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
