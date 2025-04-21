require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  clientUrl: process.env.CLIENT_URL,
};
