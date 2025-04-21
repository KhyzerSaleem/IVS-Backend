const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  tls: {
    rejectUnauthorized: false, // For local development only
  },
});

exports.sendContactEmail = async (contactData) => {
  const mailOptions = {
    from: `"Website Contact Form" <noreply@ivs-alliance.com>`,
    to: "khizarking704@gmail.com",
    subject: "New Contact Form Submission",
    html: `
      <h3>New Contact Request</h3>
      <p>Name: ${contactData.name}</p>
      <p>Email: ${contactData.email}</p>
      <p>Subject: ${contactData.subject}</p>
      <p>Message: ${contactData.message}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
