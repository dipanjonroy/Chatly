const nodemailer = require("nodemailer");
const ApiError = require("./error");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (payload) => {
  try {
    const emailOptions = {
      from: process.env.SMTP_USERNAME,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    };
    const info = await transporter.sendMail(emailOptions);
    console.log(`An email is sent: ${info.messageId}`);
  } catch (error) {
    console.error(error);
    throw new ApiError(409, "Failed to send OTP.");
  }
};

module.exports = sendEmail;
