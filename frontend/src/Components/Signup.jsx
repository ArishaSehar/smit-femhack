import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const responseGet = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
      const user = responseGet.data.find(user => user.email === data.email);

      if (user) {
        setLoading(false);
        alert("User already exists. Please log in.");
        navigate("/login");
        return;
      }

      const responsePost = await axios.post(`https://backend-of-femhack-production.up.railway.app/api/signup`, data);
      setLoading(false);
      alert("Signup successful!");
      navigate("/login");

    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
        navigate("/login");
      } else {
        console.error(e);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffeaa7] via-[#fdcb6e] to-[#ffeaa7] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 hover:scale-[1.02]">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Traking App</h1>
          <p className="mt-2 text-gray-500 text-sm">Organize your life, beautifully ✨</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#fdcb6e]"></div>
            <p className="mt-4 text-[#fdcb6e] font-semibold">Please wait... Redirecting 🥹</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                {...register('username', {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 8, message: "Maximum 8 characters" }
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#fdcb6e] focus:outline-none"
                placeholder="Areesha"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: { value: true, message: "This field is required" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  },
                  minLength: { value: 5, message: "Minimum 5 characters" },
                  maxLength: { value: 50, message: "Maximum 50 characters" }
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#fdcb6e] focus:outline-none"
                placeholder="name@company.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-[#fdcb6e]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: { value: true, message: "Password is required" },
                    minLength: { value: 8, message: "Minimum 8 characters" },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                      message: "Must include 1 uppercase, 1 number, and 1 special character"
                    }
                  })}
                  className="w-full px-4 py-2 bg-transparent focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#fdcb6e] to-[#ffeaa7] hover:from-[#fdcb6e] hover:to-[#ffeaa7] text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#fdcb6e] hover:underline font-semibold">
                Log in
              </Link>
            </p>

          </form>
        )}
      </div>
    </section>
  );
};

export default Signup;
