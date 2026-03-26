const express = require("express");
const router = express.Router();

let users = [];
let adminCodesUsed = [];

// REGISTER
router.post("/register", (req, res) => {
  const { name, email, password, role, adminCode } = req.body;

  let userRole = "user";

  if (
    role === "admin" &&
    adminCode &&
    !adminCodesUsed.includes(adminCode)
  ) {
    userRole = "admin";
    adminCodesUsed.push(adminCode);
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: userRole
  };

  users.push(newUser);

  res.json({ token: "sample", user: newUser });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({
    token: "sample",
    user
  });
});

module.exports = router;