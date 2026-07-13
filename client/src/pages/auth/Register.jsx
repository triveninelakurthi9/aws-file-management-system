import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const schema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await registerUser(data);

      login(response.token, response.user);

      toast.success(
        `Welcome, ${response.user.name}!`
      );

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-slate-800">
          Create Account 🚀
        </h2>

        <p className="mt-2 text-slate-500">
          Join CloudDrive today.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={<User size={18} />}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={18} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type={
              showPassword ? "text" : "password"
            }
            placeholder="Create a password"
            leftIcon={<Lock size={18} />}
            error={errors.password?.message}
            rightIcon={
              showPassword ? (
                <EyeOff
                  size={18}
                  onClick={() =>
                    setShowPassword(false)
                  }
                />
              ) : (
                <Eye
                  size={18}
                  onClick={() =>
                    setShowPassword(true)
                  }
                />
              )
            }
            {...register("password")}
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

export default Register;