import { motion } from "framer-motion";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            CloudDrive
          </h1>

          <p className="text-xl leading-9 text-blue-100">
            Securely upload, organize, search and manage your
            files anywhere using AWS Cloud.
          </p>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;