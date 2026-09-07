'use client';

import React from 'react';

interface CancelRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelRegistrationModal: React.FC<CancelRegistrationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-2 sm:px-0">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#B91C1C]">
          Cancel Registration?
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm sm:text-base">
          Are you sure you want to cancel your registration?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition text-sm sm:text-base cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition text-sm sm:text-base cursor-pointer"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRegistrationModal;
