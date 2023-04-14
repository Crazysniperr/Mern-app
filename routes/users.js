import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import dotenv from "dotenv";

dotenv.config();


const router = express.Router();

const secret =  process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(secret);
    // validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide a username and password.' });
    }

    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide a username and password.' });
    }

    const user = await UserModel.findOne({username});

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // generate JWT token
    const token = jwt.sign({ id: user._id }, secret);
    res.json({token, userId: user._id});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    const decodedToken = jwt.verify(token, secret);
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export { router as UserRouter, verifyToken };
