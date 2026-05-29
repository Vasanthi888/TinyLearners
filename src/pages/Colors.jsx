import ToddlerCard from "../components/ToddlerCard"
import Confetti from "react-confetti"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const colors = [
  { emoji: "🔴", word: "Red", bg: "bg-red-400" },
  { emoji: "🔵", word: "Blue", bg: "bg-blue-400" },
  { emoji: "🟢", word: "Green", bg: "bg-green-400" },
  { emoji: "🟡", word: "Yellow", bg: "bg-yellow-300" },
]

const Colors = () => {
  const navigate = useNavigate()

  const [showConfetti, setShowConfetti] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [progress, setProgress] = useState({})

  // preload voices
  useEffect(() => {
    window.speechSynthesis.getVoices()
  }, [])

  const speakWord = (word) => {
    const speech = new SpeechSynthesisUtterance(word)

    speech.lang = "en-US"
    speech.rate = 0.8
    speech.pitch = 1.3

    const voices = window.speechSynthesis.getVoices()

    const preferredVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("google") ||
        v.name.toLowerCase().includes("samantha")
    )

    if (preferredVoice) {
      speech.voice = preferredVoice
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)

    // progress tracking
    setProgress((prev) => ({
      ...prev,
      [word]: (prev[word] || 0) + 1,
    }))

    // reward logic
    setClickCount((prev) => {
      const updated = prev + 1

      if (updated >= 5) {
        setShowReward(true)

        setTimeout(() => {
          setShowReward(false)
        }, 2500)

        return 0
      }

      return updated
    })

    // confetti
    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-10">

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center animate-bounce">

            <h1 className="text-6xl mb-3">🎉</h1>

            <h2 className="text-4xl font-bold text-pink-500">
              Great Job!
            </h2>

            <p className="text-gray-600 mt-2">
              Amazing learning! 🌈
            </p>

          </div>

        </div>
      )}

      {/* Title */}
      <h1 className="text-5xl font-bold text-center text-purple-600 mb-10">
        Colors 🎨
      </h1>

      {/* Home Button */}
      <div className="flex justify-center mb-8">

        <button
          onClick={() => navigate("/")}
          className="bg-white text-2xl px-8 py-4 rounded-3xl shadow-xl"
        >
          🏠 Home
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-8">

        {colors.map((color, index) => (
          <div key={index} className={`${color.bg} rounded-3xl`}>

            <ToddlerCard
              emoji={color.emoji}
              title={color.word}
              onClick={() => speakWord(color.word)}
            />

          </div>
        ))}

      </div>

      {/* Progress Section */}
      <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">

        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          🌱 Learning Progress
        </h2>

        {Object.keys(progress).length === 0 ? (

          <p className="text-gray-500 text-lg">
            Tap colors to start learning 👆
          </p>

        ) : (

          Object.keys(progress).map((key) => (

            <div
              key={key}
              className="flex justify-between items-center mb-3"
            >

              <p className="text-lg text-gray-700">
                {key}
              </p>

              <div className="flex gap-1">

                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < progress[key] ? "🟡" : "⚪"}
                  </span>
                ))}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default Colors