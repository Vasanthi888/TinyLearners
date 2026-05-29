import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import Confetti from "react-confetti"
import { logActivity } from "../api/activityApi"

const shapes = [
  { emoji: "🔺", name: "Triangle" },
  { emoji: "🟦", name: "Square" },
  { emoji: "⚪", name: "Circle" },
  { emoji: "⭐", name: "Star" },
  { emoji: "⬟", name: "Pentagon" },
  { emoji: "⬢", name: "Hexagon" },
]

const Shapes = () => {
  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const speakShape = (shape) => {

    setSelected(shape)

    setTimeout(() => {
      setSelected(null)
    }, 1500)

    const speech = new SpeechSynthesisUtterance(shape.name)
    speech.lang = "en-US"
    speech.rate = 0.8

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)

    logActivity({
      category: "Shapes",
      itemClicked: shape.name,
    })

    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-purple-100 p-10">

      {showConfetti && <Confetti />}

      <h1 className="text-5xl font-bold text-center text-purple-700 mb-10">
        Shapes 🔺
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="bg-white px-8 py-4 rounded-3xl shadow-xl text-xl"
        >
          🏠 Home
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">

        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => speakShape(shape)}
            className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center cursor-pointer"
          >

            <div className="text-7xl">
              {shape.emoji}
            </div>

            <div className="text-3xl mt-4 text-purple-700 font-bold">
              {shape.name}
            </div>

          </motion.div>
        ))}

      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-12 rounded-3xl text-center animate-bounce">

            <div className="text-8xl">
              {selected.emoji}
            </div>

            <div className="text-4xl mt-4 font-bold text-purple-700">
              {selected.name}
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Shapes