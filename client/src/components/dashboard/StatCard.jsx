import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white`}
      >
        {icon}
      </div>

      <p className="mt-6 text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>
    </motion.div>
  );
}

export default StatCard;