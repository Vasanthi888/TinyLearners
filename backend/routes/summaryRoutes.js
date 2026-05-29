const express = require("express")
const router = express.Router()

const LearningActivity = require("../models/LearningActivity")

// 📊 GET TODAY SUMMARY
router.get("/today", async (req, res) => {
  try {

    // ✅ Start of today
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    // ✅ Today's activities
    const activities = await LearningActivity.find({
      timestamp: { $gte: startOfDay }
    })

    // =====================================
    // TOTAL INTERACTIONS
    // =====================================

    const totalInteractions = activities.length

    // =====================================
    // CATEGORY BREAKDOWN
    // =====================================

    const categoryMap = {}

    activities.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + 1
    })

    // =====================================
    // TOP CATEGORY
    // =====================================

    let topCategory = null
    let max = 0

    Object.keys(categoryMap).forEach((key) => {
      if (categoryMap[key] > max) {
        max = categoryMap[key]
        topCategory = key
      }
    })

    // =====================================
    // 🔥 STREAK SYSTEM
    // =====================================

    const allActivities = await LearningActivity.find({})

    const uniqueDays = new Set()

    allActivities.forEach((activity) => {
      const day = new Date(activity.timestamp)
        .toISOString()
        .split("T")[0]

      uniqueDays.add(day)
    })

    const streakDays = uniqueDays.size

    // =====================================

    res.json({
      totalInteractions,

      categoryBreakdown: categoryMap,

      topCategory: topCategory || "None",

      streakDays,

      message:
        totalInteractions > 0
          ? "Great learning today! 🎉"
          : "No activity yet today 👶"
    })

  } catch (error) {
    console.log("❌ Summary Error:", error)

    res.status(500).json({
      error: "Failed to fetch summary"
    })
  }
})

module.exports = router