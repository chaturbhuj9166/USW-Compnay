import Journalist from "../models/Journalist.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {

    const { name, email, username, phone, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const journalist = new Journalist({
      name,
      email,
      username,
      phone,
      password: hashPassword
    });

    await journalist.save();

    res.json({ message: "Journalist Registered" });

  } catch (error) {

    res.status(500).json(error);

  }
};



export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await Journalist.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Login error"
    });

  }

};



export const logout = async (req, res) => {

  res.status(200).json({
    success: true,
    message: "Logout successful"
  });

};