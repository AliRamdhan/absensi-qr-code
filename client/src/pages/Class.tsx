import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../common/constants";

const Class = () => {
  const [formData, setFormData] = useState({
    namaDosen: "",
    mataKuliah: "",
    namaKelas: "",
    pertemuan: "",
    startTime: "",
    endTime: "",
    duration: "",
  });
  const [user, setUser] = useState(null); // Add state for user data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch authenticated user info
    const authToken = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!authToken || !userData?.username) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(userData); // Set user data
      setFormData((prevData) => ({
        ...prevData,
        namaDosen: userData.username,
      }));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Ensure user is defined before proceeding

    try {
      const response = await axios.post(`${BASE_URL}/class`, { ...formData });
      alert("Class created successfully");
      if (response) {
        // Ensure user is available before making this request
        const addedToUser = await axios.post(
          `${BASE_URL}/user/${user.id}/classes/${response.data.id}`
        );
      }
      navigate("/"); // Redirect to home after success
    } catch (error) {
      console.error("Failed to create class", error);
      alert("Failed to create class");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-2xl font-bold text-yellow-600 sm:text-3xl">
          Create a New Class
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Fill in the details below to create a new class session.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Class Information</p>

          <div>
            <label htmlFor="namaDosen" className="sr-only">
              Nama Dosen
            </label>
            <input
              type="text"
              id="namaDosen"
              name="namaDosen"
              value={formData.namaDosen}
              onChange={handleInputChange}
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Nama Dosen"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="mataKuliah" className="sr-only">
              Mata Kuliah
            </label>
            <input
              type="text"
              id="mataKuliah"
              name="mataKuliah"
              value={formData.mataKuliah}
              onChange={handleInputChange}
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Mata Kuliah"
              required
            />
          </div>

          <div>
            <label htmlFor="namaKelas" className="sr-only">
              Nama Kelas
            </label>
            <input
              type="text"
              id="namaKelas"
              name="namaKelas"
              value={formData.namaKelas}
              onChange={handleInputChange}
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Nama Kelas"
              required
            />
          </div>

          <div>
            <label htmlFor="pertemuan" className="sr-only">
              Pertemuan Ke-Berapa
            </label>
            <input
              type="number"
              id="pertemuan"
              name="pertemuan"
              value={formData.pertemuan}
              onChange={handleInputChange}
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Pertemuan Ke-Berapa"
              required
            />
          </div>

          <div className="w-full flex justify-between items-center gap-x-4">
            <div className="w-full">
              <label htmlFor="startTime" className="sr-only">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="endTime" className="sr-only">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="sr-only">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Duration (e.g., 2 hours)"
              required
            />
          </div>

          <div className="w-full flex justify-between items-center gap-x-4">
            <Link to={`/`} className="w-full">
              <button
                type="button"
                className="block w-full rounded-lg bg-gray-600 px-5 py-3 text-sm font-medium text-white"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              className="block w-full rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white"
            >
              Create Class
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Need help?
            <a className="underline" href="#">
              Contact support
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Class;
