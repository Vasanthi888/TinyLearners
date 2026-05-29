const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const activityRoutes = require("./routes/activityRoutes")
const summaryRoutes = require("./routes/summaryRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/activity", activityRoutes)
app.use("/api/summary", summaryRoutes)

// Health check route
app.get("/", (req, res) => {
  res.send("TinyLearners API Running 🚀")
})

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("Mongo Error:", err))

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})