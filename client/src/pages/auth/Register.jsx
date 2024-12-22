import React, { useState } from "react";
import axios from "axios";
import RegisterPict from "/assets/register.jpg";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../../common/constants";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "dosen",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        formData
      );
      if (response && response.data) {
        alert("User registered successfully:");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Create Your Account
          </h1>
          <p className="mt-4 text-gray-500">
            Join the absensi platform and simplify your attendance management.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Have an account?
              <Link to="/login" className="underline ml-1 text-gray-900">
                Sign In
              </Link>
            </p>
            <button
              type="submit"
              className="inline-block rounded-lg bg-yellow-500 px-5 py-3 text-sm uppercase font-bold text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src={RegisterPict}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
