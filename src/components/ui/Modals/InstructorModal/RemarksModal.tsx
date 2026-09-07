'use client';

import React, { useState } from 'react';

interface SendRemarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  studentName: string;
}

const SendRemarksModal: React.FC<SendRemarksModalProps> = ({ isOpen, onClose, onSubmit, studentName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    setTitleError('');
    setDescError('');

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Title is required.');
      isValid = false;
    }

    if (!description.trim()) {
      setDescError('Description is required.');
      isValid = false;
    }

    if (isValid) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 max-w-xs sm:max-w-xl w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold cursor-pointer transition-colors"
          onClick={onClose}
          aria-label="Close remarks modal"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08228d] text-center mb-6">
          Send Remarks to {studentName}
        </h2>

        {/* Form Inputs */}
        <div className="w-full max-w-sm mx-auto space-y-4 sm:space-y-5">
          {/* Remarks Title */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Title:</label>
            <input
              type="text"
              placeholder="Enter remarks title"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${titleError ? 'border-red-500' : ''}`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError('');
              }}
            />
            {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
          </div>

          {/* Remarks Description */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Description:</label>
            <textarea
              placeholder="Write feedback or remarks here..."
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${descError ? 'border-red-500' : ''}`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescError('');
              }}
              rows={4}
            />
            {descError && <p className="text-red-500 text-xs mt-1">{descError}</p>}
          </div>

          {/* Send Button */}
          <button
            className="mt-4 w-full bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            Send Remarks
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendRemarksModal;
