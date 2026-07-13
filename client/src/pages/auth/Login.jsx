import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      const response = await loginUser(data);

      login(response.token, response.user);

      toast.success(`Welcome back, ${response.user.name}!`);

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed"
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
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Sign in to continue to CloudDrive.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
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
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

export default Login;