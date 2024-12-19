import React from "react";
import { Link } from "react-router";

const Class = () => {
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
          action="#"
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
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Nama Dosen"
            />
          </div>

          <div>
            <label htmlFor="mataKuliah" className="sr-only">
              Mata Kuliah
            </label>
            <input
              type="text"
              id="mataKuliah"
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Mata Kuliah"
            />
          </div>

          <div>
            <label htmlFor="namaKelas" className="sr-only">
              Nama Kelas
            </label>
            <input
              type="text"
              id="namaKelas"
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Nama Kelas"
            />
          </div>

          <div>
            <label htmlFor="pertemuan" className="sr-only">
              Pertemuan Ke-Berapa
            </label>
            <input
              type="number"
              id="pertemuan"
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Pertemuan Ke-Berapa"
            />
          </div>
          <div className="w-full flex justify-between items-center gap-x-4">
            <div className="w-full">
              <label htmlFor="startDate" className="sr-only">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              />
            </div>

            <div className="w-full">
              <label htmlFor="endDate" className="sr-only">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
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
              className="w-full rounded-lg border-b border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Duration (e.g., 2 hours)"
            />
          </div>
          <div className="w-full flex justify-between items-center gap-x-4">
            <Link to={`/`} className="w-full">
              <button
                type="submit"
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
