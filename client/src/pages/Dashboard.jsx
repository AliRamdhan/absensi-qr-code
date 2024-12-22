import React, { useEffect, useState } from "react";
import Header from "../components/shared/Header";
import ClassCard from "../components/ClassCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../common/constants";
const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login"); // Redirect to login page
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userData.id}`);
        console.log(response.data);
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <Header />

      <div className="container py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          Your Classes
        </h1>

        <p className="mt-4 text-gray-500">
          Click below to generate QR codes for student attendance.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} classData={classItem} />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
