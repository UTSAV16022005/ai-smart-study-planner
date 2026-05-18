import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  streak: user.streak,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt
});

const updateLoginStreak = (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;

  if (!lastLogin) {
    user.streak = 1;
  } else {
    lastLogin.setHours(0, 0, 0, 0);
    const dayDifference = Math.round((today - lastLogin) / (1000 * 60 * 60 * 24));
    if (dayDifference === 1) user.streak += 1;
    if (dayDifference > 1) user.streak = 1;
  }

  user.lastLogin = new Date();
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword, streak: 1, lastLogin: new Date() });

  res.status(201).json({ token: createToken(user._id), user: publicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  updateLoginStreak(user);
  await user.save();

  res.json({ token: createToken(user._id), user: publicUser(user) });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: publicUser(req.user) });
});
