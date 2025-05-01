const User = require('../models/userModel'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpService = require('../services/otpService'); // Assuming you have an OTP service
require('dotenv').config();

// Function to send email
const sendEmail = async (email, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: body,
  };

  await transporter.sendMail(mailOptions);
};

// Controller methods
exports.sendEMAILOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ Email: { $regex: new RegExp(`^${email}$`, 'i') } });
  if (!user) {
    return res.status(404).send('Email not found');
  }
  const { otp, expiry } = otpService.generateOtp();

  const emailBody = `
    <div style="text-align: center; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 2px solid black; min-width: 200px; max-width: 300px; width: 100%; margin: 50px auto;">
      <h2 style="color: blue;">Email Authentication OTP <hr /></h2>
      <p>
        <strong>OTP:</strong><br /> ${otp}
      </p>
    </div>`;

  await sendEmail(email, 'Your OTP For Login in VMS', emailBody);

  const otps = {
    EmailOTP: otp,
    Expires: expiry,
  };

  res.status(200).json(otps);
};

exports.verification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ Email: { $regex: new RegExp(`^${email}$`, 'i') } });
  if (!user) {
    return res.status(400).send('User not found');
  }

  const token = generateToken(user);
  res.status(200).json({ token });
};

exports.sendRegEMAILOtp = async (req, res) => {
  const { email } = req.body;

  const { otp, expiry } = otpService.generateOtp();

  const emailBody = `
    <div style="text-align: center; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 2px solid black; min-width: 200px; max-width: 300px; width: 100%; margin: 50px auto;">
      <h2 style="color: blue;">Email Authentication OTP <hr /></h2>
      <p>
        <strong>OTP:</strong><br /> ${otp}
      </p>
    </div>`;

  await sendEmail(email, 'Your OTP For Registration in VMS', emailBody);

  const otps = {
    EmailOTP: otp,
    Expires: expiry,
  };

  res.status(200).json(otps);
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ Email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = user.password == password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateToken = (user) => {
  const payload = { userId: user._id };
  const secretKey = process.env.JWT_SECRET;

  return jwt.sign(payload, secretKey);
};
