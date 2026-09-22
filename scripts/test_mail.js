const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read .env if present
let envUser = process.env.GMAIL_USER;
let envPass = process.env.GMAIL_APP_PASSWORD;

try {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const userMatch = envContent.match(/GMAIL_USER=(.*)/);
    const passMatch = envContent.match(/GMAIL_APP_PASSWORD=(.*)/);
    if (userMatch) envUser = userMatch[1].trim();
    if (passMatch) envPass = passMatch[1].trim();
  }
} catch (e) {}

const email = envUser || 'shitanshupatel93@gmail.com';
const pass = envPass || '';

async function main() {
  console.log('Testing Gmail SMTP with:', email, pass);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pass,
    },
  });

  try {
    const res = await transporter.sendMail({
      from: `"Bank Nova" <${email}>`,
      to: 'amitpatel63922588@gmail.com',
      subject: "Bank Nova Verification Code Test: 849201",
      text: "Your Bank Nova test OTP is 849201.",
    });
    console.log("SUCCESS! Email sent to amitpatel63922588@gmail.com! MessageId:", res.messageId);
  } catch (err) {
    console.error("FAILED to send:", err.message);
  }
}

main();
