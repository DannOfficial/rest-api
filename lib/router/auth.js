const express = require("express")
const router = express.Router()
const User = require("../../models/user")

// Router (GET & POST)
router.get("/login", (req, res) => {
  res.render("login")
})

router.get("/register", (req, res) => {
  res.render("register")
})

// Register
router.post("/register", async (req, res) => {
  const { username, password, email, phone } = req.body

  try {
    const user = new User({ username, password, email, phone })
    await user.save()
    res.redirect("/auth/login")
  } catch (err) {
    res.status(400).send("Error registering user")
  }
})

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user || user.password !== password) {
      return res.status(400).send("Invalid username or password")
    }

    req.session.user = user
    res.redirect("/dashboard")
  } catch (err) {
    res.status(500).send("Server error")
  }
})

module.exports = router