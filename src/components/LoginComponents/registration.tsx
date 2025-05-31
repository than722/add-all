import React from 'react';

export default function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white/90 backdrop-blur-md rounded-2xl max-w-md w-full p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#1E3A5F]">
          Register
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-gray-700 mb-1 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3]"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-gray-700 mb-1 font-semibold">
              Contact No.
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#92D0D3] text-white py-2 rounded-lg font-semibold hover:bg-[#7bbec2] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
