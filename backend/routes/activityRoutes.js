const express = require("express")
const router = express.Router()
const LearningActivity = require("../models/LearningActivity")

// ======================================
// 📌 POST /api/activity/log
// ======================================
router.post("/log", async (req, res) => {
  try {
    console.log("🔥 BODY RECEIVED:", req.body)

    const { category, itemClicked } = req.body

    // ✅ validation
    if (!category || !itemClicked) {
      return res.status(400).json({
        success: false,
        message: "category and itemClicked are required",
      })
    }

    // ✅ create activity
    const activity = new LearningActivity({
      category,
      itemClicked,
    })

    const savedActivity = await activity.save()

    console.log("✅ SAVED TO DB:", savedActivity)

    return res.status(201).json({
      success: true,
      message: "Activity saved successfully",
      data: savedActivity,
    })
  } catch (error) {
    console.log("❌ ERROR saving activity:", error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
})

module.exports = router