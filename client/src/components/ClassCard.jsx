import React from "react";
import { Link } from "react-router";

const ClassCard = ({ classData = {} }) => {
  return (
    <div className="p-8 space-y-3 border-2 border-yellow-700 rounded-xl">
      <span className="inline-block text-yellow-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      </span>

      <h1 className="text-xl font-semibold text-gray-700 capitalize">
        {classData?.namaKelas || "Class Name"}
      </h1>
      <div className="text-gray-800">
        <p>
          <span className="font-semibold">Subject: </span>
          {classData?.mataKuliah || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Time: </span>{" "}
          {classData?.startTime || "N/A"} AM - {classData?.endTime || "N/A"} PM
        </p>
        <p>
          <span className="font-semibold">Duration: </span>{" "}
          {classData?.duration || "0"} Hours
        </p>
        <p>
          <span className="font-semibold">Pertemuan: </span>{" "}
          {classData?.pertemuan || "N/A"}
        </p>
      </div>
      <Link
        to={`/class/${classData?.id}`}
        className="inline-flex p-2 text-yellow-900 capitalize transition-colors duration-300 transform bg-yellow-100 rounded-full rtl:-scale-x-100 hover:underline hover:text-yellow-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-2">See More</span>
      </Link>
    </div>
  );
};

export default ClassCard;
