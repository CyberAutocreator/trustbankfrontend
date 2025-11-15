import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

// Simulated user database
const users = [{ email: "ruth@trustbank.com", password: "allen123" }];

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign({ email }, "your-secret", { expiresIn: "1h" });
  res.json({ accessToken: token });
});

export default router;
