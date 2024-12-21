import React, { useState } from "react";
import axios from "axios";
import LoginPict from "/assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../common/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      // Store the token and user info in local storage or context
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("User login successfully:");
      // Navigate to the dashboard or home page
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Log In to Your Account
          </h1>

          <p className="mt-4 text-gray-500">
            Access your absensi platform to manage your attendance seamlessly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link to="/register" className="underline ml-1 text-gray-900">
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-yellow-500 px-5 py-3 text-sm uppercase font-bold text-white"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Login illustration"
          src={LoginPict}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Login;
