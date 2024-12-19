import React from "react";
import { Link } from "react-router";
const Header = () => {
  return (
    <header className="bg-white border-b-2">
      <div className="w-full py-8 sm:py-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Halo Admin
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Welcome to our platform absensi
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/class">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded bg-yellow-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-yellow-700 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> Create Class </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
