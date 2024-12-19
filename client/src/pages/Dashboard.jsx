import React from "react";
import Header from "../components/shared/Header";
import ClassCard from "../components/ClassCard";

const Dashboard = () => {
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
          <ClassCard />
          <ClassCard />
          <ClassCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
