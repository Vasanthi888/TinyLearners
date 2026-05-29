import { logActivity } from "../api/activityApi"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const numbers = [
  { num: 1, word: "One" },
  { num: 2, word: "Two" },
  { num: 3, word: "Three" },
  { num: 4, word: "Four" },
  { num: 5, word: "Five" },
  { num: 6, word: "Six" },
  { num: 7, word: "Seven" },
  { num: 8, word: "Eight" },
  { num: 9, word: "Nine" },
  { num: 10, word: "Ten" },
]

const Numbers = () => {
  const navigate = useNavigate()

  const [showConfetti, setShowConfetti] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [progress, setProgress] = useState({})
  const [selected, setSelected] = useState(null)
  const [clickCount, setClickCount] = useState(0)

  const speakNumber = (item) => {
    console.log("CLICKED:", item)

    // 👶 Show popup
    setSelected(item)

    // ⏱ Auto close popup
    setTimeout(() => {
      setSelected(null)
    }, 1500)

    // 🔊 Speech
    const speech = new SpeechSynthesisUtterance(item.word)
    speech.lang = "en-US"
    speech.rate = 0.75
    speech.pitch = 1.4

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)

    // 📊 Progress tracking
    setProgress((prev) => ({
      ...prev,
      [item.word]: (prev[item.word] || 0) + 1,
    }))

    // 📡 SEND TO BACKEND (IMPORTANT)
    console.log("📡 Sending activity to backend...")

    logActivity({
      category: "Numbers",
      itemClicked: item.word,
    })
      .then(() => {
        console.log("✅ Activity saved")
      })
      .catch((err) => {
        console.log("❌ API Error:", err)
      })

    // 🎯 Reward system
    setClickCount((prev) => {
      const updated = prev + 1

      if (updated >= 6) {
        setShowReward(true)
        setTimeout(() => setShowReward(false), 2000)
        return 0
      }

      return updated
    })

    // 🎉 Confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 900)
  }

  return (
    <div className="min-h-screen bg-blue-100 p-10">

      {showConfetti && <Confetti />}

      {/* 🎉 Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-10 rounded-3xl text-center animate-bounce">
            <h1 className="text-6xl">🎉</h1>
            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              Great Job!
            </h2>
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="text-5xl font-bold text-center text-blue-700 mb-10">
        Numbers 🔢
      </h1>

      {/* Home Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="bg-white px-8 py-4 rounded-3xl shadow-xl text-xl"
        >
          🏠 Home
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-8">
        {numbers.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => speakNumber(item)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center cursor-pointer"
          >
            <div className="text-6xl font-bold text-blue-600">
              {item.num}
            </div>

            <div className="text-2xl mt-2 text-gray-700">
              {item.word}
            </div>

            <div className="flex gap-1 mt-4">
              {[...Array(item.num)].map((_, i) => (
                <span key={i} className="text-xl">🔵</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 👶 POPUP */}
      {selected !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-3xl text-center animate-bounce">

            <div className="text-8xl font-bold text-blue-600">
              {selected.num}
            </div>

            <div className="text-3xl mt-2">
              {selected.word}
            </div>

            <div className="flex justify-center mt-4 gap-1">
              {[...Array(selected.num)].map((_, i) => (
                <span key={i} className="text-2xl">🔵</span>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          🌱 Learning Progress
        </h2>

        {Object.keys(progress).length === 0 ? (
          <p className="text-gray-500">Tap numbers to start 👆</p>
        ) : (
          Object.keys(progress).map((key) => (
            <div key={key} className="flex justify-between mb-2">
              <p>{key}</p>
              <span className="bg-blue-200 px-3 rounded-full">
                {progress[key]}x
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Numbers 