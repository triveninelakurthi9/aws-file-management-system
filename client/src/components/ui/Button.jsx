import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-xl
        bg-blue-600
        px-4
        py-3
        text-white
        font-semibold
        shadow-lg
        transition
        hover:bg-blue-700
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

export default Button;