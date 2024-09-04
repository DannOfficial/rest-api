const express = require("express")
const router = express.Router()

router.get("/tiktok", async (req, res) => {
  const { url } = req.query

  try {
    res.status(200).json({ message: `Fetching data from: ${url}` })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router