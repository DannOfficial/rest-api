const express = require("express")
const router = express.Router()

// Dashboard
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login")
  }

  const { username, apikey, limit, registered } = req.session.user

  res.render("dashboard", {
    username,
    apikey,
    limit,
    registered
  })
})

// Home Route
router.get("/", (req, res) => {
  res.render("index")
})

module.exports = router