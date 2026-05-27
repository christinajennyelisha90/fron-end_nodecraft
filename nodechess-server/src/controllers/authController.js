const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    const exist = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (exist) {
      return res.status(400).json({
        message: "User Already Exists"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      rating: 1200,
      totalMatch: 0
    });

    res.json({
      message: "Register Success",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Success",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};