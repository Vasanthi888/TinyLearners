import { motion } from "framer-motion"

const Card = ({ emoji, word, onClick }) => {

  return (

    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center justify-center cursor-pointer"
    >

      <div className="text-8xl">
        {emoji}
      </div>

      <h2 className="text-3xl font-bold mt-4 text-gray-700">
        {word}
      </h2>

    </motion.div>

  )
}

export default Card