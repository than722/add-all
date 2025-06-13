import React from 'react';

/**
 * A modal component for user registration.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
export default function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Return null to prevent rendering the modal when it is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
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

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#1E3A5F]">
          Register
        </h2>
        <form
          className="space-y-3 sm:space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission here
            console.log('Form submitted');
          }}
        >
          <div>
            <label htmlFor="fullname" className="block text-gray-700 mb-1 font-semibold text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3] text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-gray-700 mb-1 font-semibold text-sm">
              Contact No.
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3] text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition text-sm"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
