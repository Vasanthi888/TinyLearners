import { motion } from "framer-motion"

const ToddlerCard = ({
  emoji,
  title,
  subtitle,
  onClick,
  bgColor = "bg-white"
}) => {

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${bgColor} rounded-3xl shadow-xl p-10 flex flex-col items-center justify-center cursor-pointer`}
    >

      <div className="text-7xl">
        {emoji}
      </div>

      <h2 className="text-3xl font-bold mt-4 text-gray-700">
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg text-gray-500 mt-2">
          {subtitle}
        </p>
      )}

    </motion.div>
  )
}

export default ToddlerCard