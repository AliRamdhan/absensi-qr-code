import React, { useEffect } from "react";
import QRPict from "/assets/qr.png";
const ModalQR = ({ isOpen, setIsOpen }) => {
  // Close the modal when pressing the Esc key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);

  // Close the modal when clicking outside
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-overlay") {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleOutsideClick}
    >
      <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
        <div className="flex items-center justify-center mx-auto">
          <img className="h-full rounded-lg" src={QRPict} alt="" />
        </div>

        <div className="mt-5 text-center">
          <h3
            className="text-lg font-medium text-gray-800 dark:text-white"
            id="modal-title"
          >
            QR Code
          </h3>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Scan this QR code to notify about your absence. You can also share
            this code with others.
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-5 gap-x-2">
          <input
            type="text"
            value="https://dwqdwqdwqofwgihuot4r43795y23rh32ibl"
            readOnly
            className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />

          <button className="rounded-md hidden sm:block p-1.5 text-gray-700 bg-white border border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
          >
            Cancel
          </button>

          <button className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalQR;
