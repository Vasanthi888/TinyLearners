import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

const ParentSummary = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get("https://tinylearners.onrender.com/api/summary/today")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-xl mt-10 text-center">
        <p className="text-lg text-gray-500">
          Loading learning summary...
        </p>
      </div>
    )
  }

  // ⭐ Achievement Logic
  const achievements = []

  if (data.totalInteractions >= 1) {
    achievements.push("⭐ First Learner")
  }

  if (data.totalInteractions >= 5) {
    achievements.push("🔥 Active Explorer")
  }

  if (data.topCategory === "Numbers") {
    achievements.push("🔢 Number Explorer")
  }

  if (data.topCategory === "Animals") {
    achievements.push("🦁 Animal Friend")
  }

  if (data.topCategory === "Fruits") {
    achievements.push("🍎 Fruit Lover")
  }

  if (data.topCategory === "Colors") {
    achievements.push("🎨 Color Master")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-3xl shadow-2xl mt-10 border-4 border-yellow-200"
    >

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">
        👨‍👩‍👧 Today's Learning Summary
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-blue-100 rounded-2xl p-4 text-center">
          <p className="text-4xl">📊</p>

          <h3 className="text-2xl font-bold text-blue-700 mt-2">
            {data.totalInteractions}
          </h3>

          <p className="text-gray-600">
            Total Activities
          </p>
        </div>

        <div className="bg-pink-100 rounded-2xl p-4 text-center">
          <p className="text-4xl">🏆</p>

          <h3 className="text-2xl font-bold text-pink-700 mt-2">
            {data.topCategory}
          </h3>

          <p className="text-gray-600">
            Favorite Topic
          </p>
        </div>

      </div>

      {/* Breakdown */}
      <div className="bg-yellow-50 rounded-2xl p-5 mb-6">

        <h3 className="text-xl font-bold text-yellow-700 mb-4">
          📚 Activity Breakdown
        </h3>

        {Object.entries(data.categoryBreakdown).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center mb-3 bg-white rounded-xl px-4 py-2 shadow-sm"
          >
            <span className="font-medium text-gray-700">
              {key}
            </span>

            <span className="bg-purple-200 px-3 py-1 rounded-full font-bold text-purple-700">
              {value}
            </span>
          </div>
        ))}

      </div>

      {/* Achievements */}
      <div className="bg-green-50 rounded-2xl p-5 mb-6">

        <h3 className="text-xl font-bold text-green-700 mb-4">
          🏅 Achievements
        </h3>

        <div className="flex flex-wrap gap-3">

          {achievements.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="bg-white px-4 py-2 rounded-full shadow-md text-lg"
            >
              {item}
            </motion.div>
          ))}

        </div>

      </div>

      {/* Encouragement */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="bg-linear-to-r from-pink-200 to-yellow-200 rounded-2xl p-5 text-center"
      >

        <p className="text-2xl font-bold text-purple-700">
          {data.message}
        </p>

      </motion.div>

    </motion.div>
  )
}

export default ParentSummary