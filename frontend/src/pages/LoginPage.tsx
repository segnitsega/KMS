import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import "./landing-page";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";

interface loginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const LoginPage = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const url = import.meta.env.VITE_BACKEND_URL;

  async function loginUser(email: string, password: string) {
    const response = await axios.post(`${url}/user/login`, {
      email: email,
      password: password,
    });
    return response.data;
  }

  const { mutateAsync, isLoading, isError, error, data } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setIsAuthenticated(true);
      alert("Login successful!");
    },
    onError: (data) => {
      console.log("Error login response: ", data);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left Side - Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-blue-900/50 backdrop-blur-sm">
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to our Community{" "}
              </h1>

              <p className="text-blue-200">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social media Login Buttons */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-blue-900/50 text-blue-200">Or</span>
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-blue-800/30 border border-blue-600 text-white placeholder-blue-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-blue-800/30 border border-blue-600 text-white placeholder-blue-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-cyan-400 bg-blue-800/30 border-blue-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-blue-200 text-sm"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-900/40"></div>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1000')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 right-20 w-16 h-16 bg-cyan-400/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 left-16 w-12 h-12 bg-blue-400/30 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-8 w-8 h-8 bg-cyan-300/40 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
