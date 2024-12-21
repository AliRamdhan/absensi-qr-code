import React from "react";

const StatsCard = ({ isPresent, isAbsent, count,title }) => {
  return (
    <article
      className={`flex items-center gap-4 rounded-lg border border-gray-100 ${
        isPresent ? "bg-green-500" : isAbsent ? "bg-red-500" : "bg-yellow-500"
      } p-6`}
    >
      <span className="rounded-full bg-blue-100 p-3 text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M6 20h5v-2a3 3 0 00-5.356-1.857M12 11a4 4 0 100-8 4 4 0 000 8zm6 7v1m-6 0v-1m-6 0v1m12 0H6"
          />
        </svg>
      </span>

      <div>
        <p className="text-2xl font-medium text-white">{count} Mahasiswa</p>

        <p className="text-sm text-white">{title}</p>
      </div>
    </article>
  );
};

export default StatsCard;
