import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ParentSummary from "../components/ParentSummary"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-200 via-yellow-100 to-blue-100 overflow-hidden relative">

      {/* Floating Background Emojis */}
      <div className="absolute top-10 left-10 text-5xl animate-bounce">☁️</div>
      <div className="absolute top-20 right-16 text-5xl animate-pulse">⭐</div>
      <div className="absolute bottom-10 left-20 text-5xl animate-bounce">🌈</div>
      <div className="absolute bottom-20 right-10 text-5xl animate-pulse">🧸</div>

      <div className="flex flex-col items-center justify-center pt-16 px-6">

        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-extrabold text-pink-600 text-center"
        >
          TinyLearners
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-xl md:text-2xl text-gray-700 text-center max-w-xl"
        >
          Fun Interactive Learning For Curious Toddlers 🌟
        </motion.p>

        {/* Menu Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-8">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/flashcards")}
            className="bg-red-400 hover:bg-red-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
          >
            <span className="text-6xl">🔤</span>
            <span className="text-2xl font-bold mt-3">ABC</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/numbers")}
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
          >
            <span className="text-6xl">🔢</span>
            <span className="text-2xl font-bold mt-3">123</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/animals")}
            className="bg-green-400 hover:bg-green-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
          >
            <span className="text-6xl">🦁</span>
            <span className="text-2xl font-bold mt-3">Animals</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/fruits")}
            className="bg-pink-400 hover:bg-pink-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
          >
            <span className="text-6xl">🍎</span>
            <span className="text-2xl font-bold mt-3">Fruits</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/colors")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
          >
            <span className="text-6xl">🎨</span>
            <span className="text-2xl font-bold mt-3">Colors</span>
          </motion.button>

          <motion.button
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/shapes")}
  className="bg-purple-400 hover:bg-purple-500 text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center"
>
  <span className="text-6xl">🔺</span>
  <span className="text-2xl font-bold mt-3">Shapes</span>
</motion.button>

        </div>

        {/* 👨 Parent Summary (IMPORTANT) */}
        <div className="mt-12 w-full flex justify-center">
          <div className="w-full max-w-2xl">
            <ParentSummary />
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mt-10 text-gray-600 text-lg text-center">
          Learn • Play • Smile 😊
        </p>

      </div>
    </div>
  )
}

export default Home