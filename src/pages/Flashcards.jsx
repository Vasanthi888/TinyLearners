import ToddlerCard from "../components/ToddlerCard"
import Confetti from "react-confetti"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const flashcards = [
  { letter: "A", emoji: "🍎", word: "Apple" },
  { letter: "B", emoji: "⚽", word: "Ball" },
  { letter: "C", emoji: "🐱", word: "Cat" },
  { letter: "D", emoji: "🐶", word: "Dog" },
  { letter: "E", emoji: "🐘", word: "Elephant" },
  { letter: "F", emoji: "🐟", word: "Fish" },
]

const Flashcards = () => {
  const navigate = useNavigate()

  const [showConfetti, setShowConfetti] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [selected, setSelected] = useState(null)
  const [progress, setProgress] = useState({})
  const [clickCount, setClickCount] = useState(0)

  // preload voices
  useEffect(() => {
    window.speechSynthesis.getVoices()
  }, [])

  const speakWord = (item) => {
    setSelected(item)

    const speech = new SpeechSynthesisUtterance(
      `${item.letter} for ${item.word}`
    )

    const voices = window.speechSynthesis.getVoices()

    const preferredVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("google")
    )

    if (preferredVoice) {
      speech.voice = preferredVoice
    }

    speech.lang = "en-US"
    speech.rate = 0.8
    speech.pitch = 1.3

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)

    // progress tracking
    setProgress((prev) => ({
      ...prev,
      [item.word]: (prev[item.word] || 0) + 1,
    }))

    // reward logic
    setClickCount((prev) => {
      const updated = prev + 1

      if (updated >= 6) {
        setShowReward(true)

        setTimeout(() => {
          setShowReward(false)
        }, 2200)

        return 0
      }

      return updated
    })

    // confetti
    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
    }, 1200)

    // auto close popup
    setTimeout(() => {
      setSelected(null)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-10">

      {showConfetti && <Confetti />}

      {/* Reward */}
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-10 rounded-3xl text-center animate-bounce">
            <h1 className="text-6xl">🎉</h1>

            <h2 className="text-4xl font-bold text-pink-500 mt-3">
              Great Job!
            </h2>

            <p className="text-gray-600 mt-2">
              You are learning fast 🌟
            </p>
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="text-5xl font-bold text-center text-pink-600 mb-10">
        ABC Flashcards 🔤
      </h1>

      {/* Home */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="bg-white px-8 py-4 rounded-3xl shadow-xl text-2xl"
        >
          🏠 Home
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-8">

        {flashcards.map((item, index) => (
          <div key={index} className="relative">

            {/* Letter Bubble */}
            <div className="absolute -top-4 -left-4 bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
              {item.letter}
            </div>

            <ToddlerCard
              emoji={item.emoji}
              title={item.word}
              onClick={() => speakWord(item)}
            />

          </div>
        ))}

      </div>

      {/* Popup */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-10 rounded-3xl text-center animate-bounce">

            <div className="text-7xl font-bold text-pink-500">
              {selected.letter}
            </div>

            <div className="text-8xl mt-3">
              {selected.emoji}
            </div>

            <div className="text-3xl mt-4 font-bold text-gray-700">
              {selected.word}
            </div>

          </div>

        </div>
      )}

      {/* Progress */}
      <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl">

        <h2 className="text-2xl font-bold text-pink-600 mb-4">
          🌱 Learning Progress
        </h2>

        {Object.keys(progress).length === 0 ? (
          <p className="text-gray-500">
            Tap letters to start learning 👆
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
                  <span key={i}>
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

export default Flashcards