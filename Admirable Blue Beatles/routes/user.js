import express from "express";
import { authenticate } from "../middlewears/auth.js";
const router = express.Router();

router.get('/userProfile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

export default router