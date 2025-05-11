import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pranshu007parashar@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export default transporter;