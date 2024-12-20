import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import StudentList from "../components/StudentList";
import { Link } from "react-router-dom";
import ModalQR from "../components/ModalQR";
const ClassDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
      <div className="mb-8">
        <Link to={`/`}>
          <button className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-1 text-black transition-colors hover:bg-black focus:outline-none focus:ring active:bg-black">
            <span className="shrink-0 rounded-full border border-gray-900 bg-white p-1 group-active:border-gray-900">
              <svg
                className="size-5 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <span className="font-medium transition-colors group-hover:text-white">
              Back
            </span>
          </button>
        </Link>
      </div>
      <div className="w-full mb-10 md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-gray-400">
            Class A
          </p>
        </div>
        <h2 className="font-sans text-2xl font-bold leading-none tracking-tight text-gray-900 sm:text-3xl md:mx-auto mb-1">
          Matkul A
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Dosen : Ahmad Saroni - 2 Jam (10.00 - 11.00)
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard isAbsent={false} isPresent={true} />
        <StatsCard isAbsent={false} isPresent={false} />
        <StatsCard isAbsent={true} isPresent={false} />
      </div>

      <p className="mx-auto mb-4 text-gray-600 sm:text-center lg:max-w-2xl lg:mb-6 md:px-16 mt-4">
        Statistik siswa kelas A - Matkul A
      </p>

      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-yellow-600 transition-colors hover:bg-yellow-600 focus:outline-none focus:ring active:bg-yellow-500"
        >
          <span className="font-medium transition-colors group-hover:text-white">
            Generate Code QR
          </span>

          <span className="shrink-0 rounded-full border border-yellow-600 bg-white p-2 group-active:border-yellow-500">
            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
      {isOpen && <ModalQR setIsOpen={setIsOpen} isOpen={isOpen} />}
      <div className="container py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          Your Students
        </h1>

        <p className="mt-4 text-gray-500">List of students Class A</p>

        <StudentList />
      </div>
    </div>
  );
};

export default ClassDetails;
