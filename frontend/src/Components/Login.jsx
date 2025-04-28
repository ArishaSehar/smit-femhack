import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const responseGet = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
      const user = responseGet.data.find(user => user.email === data.email);
      const checkEmail = responseGet.data.find(checkEmail => checkEmail.email === data.email || checkEmail.password == data.password);
      if (!user) {
        alert("User not found, please create an account 🥺");
        navigate("/");
      } else {
        if (user.password !== data.password) {
          alert("Incorrect credentials 😭");
        } else {
          alert("Login successful! 🥰");
          localStorage.setItem("token", user.token);
          navigate("/dashboard");
        }
      }
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
        navigate("/login");
      } else {
        console.log(e);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="relative py-6 bg-gradient-to-r from-[#ffeaa7] to-[#fdcb6e] min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="text-center">
          <h1 className="text-[36px] font-extrabold text-white">Welcome Back!</h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            <p className="mt-4 text-white font-semibold">Please wait... Redirecting you 🥹</p>
          </div>
        ) : (
          <div className="w-full rounded-lg shadow-md bg-white p-8 space-y-6">
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900">
              Sign in
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#fdcb6e] focus:outline-none"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: { value: true, message: "This field is required" },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    },
                  })}
                />
                {errors.email && <div className="text-red-500">{errors.email.message}</div>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-4 py-2 text-sm rounded-lg focus:outline-none"
                    placeholder="••••••••"
                    {...register("password", {
                      required: { value: true, message: "Password is required" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 py-2 text-gray-500"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <div className="text-red-500">{errors.password.message}</div>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#fdcb6e] text-white py-2 px-4 rounded-lg focus:ring-4 focus:ring-[#fdcb6e] hover:bg-[#ffeaa7]"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500">
                Doesn't have an account?{" "}
                <Link to="/" className="font-medium text-sky-600 hover:underline">
                  Signup
                </Link>
              </p>
            </form>

            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    className="mt-4 flex space-x-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* Example of drag and drop items */}
                    <Draggable draggableId="item-1" index={0}>
                      {(provided) => (
                        <div
                          className="p-4 rounded-lg bg-[#fdcb6e] text-white"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Item 1
                        </div>
                      )}
                    </Draggable>
                    <Draggable draggableId="item-2" index={1}>
                      {(provided) => (
                        <div
                          className="p-4 rounded-lg bg-[#fdcb6e] text-white"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          Item 2
                        </div>
                      )}
                    </Draggable>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
