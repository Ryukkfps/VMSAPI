const crypto = require('crypto');

exports.generateOtp = () => {
  const otp = crypto.randomInt(100000, 999999);
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
  return { otp, expiry };
};
