import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl p-10 shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-bold text-slate-800">
          Create Account 🚀
        </h2>

        <p className="mt-2 text-slate-500">
          Join CloudDrive and securely manage your files.
        </p>

        <form className="mt-8 space-y-5">

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={<User size={18} />}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={18} />}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            leftIcon={<Lock size={18} />}
            rightIcon={
              showPassword ? (
                <EyeOff
                  size={18}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />

          <Button>
            Create Account
          </Button>

        </form>

        <p className="mt-8 text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign In
          </Link>
        </p>

      </motion.div>
    </AuthLayout>
  );
}

export default Register;