const nodemailer = require('nodemailer');

const email = 'shitanshupatel93@gmail.com';
const pass = 'digxpzhiudgrltwe';

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
