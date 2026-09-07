'use client';

import React from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  programName: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  programName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-2 sm:px-0">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 focus:outline-none text-xl sm:text-2xl cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#1E3A5F]">
          Confirm Registration
        </h2>

        <p className="text-center text-gray-700 mb-6 text-sm sm:text-base">
          Do you want to register for <span className="font-semibold">{programName}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition text-sm sm:text-base cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7bbec2] transition text-sm sm:text-base cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
