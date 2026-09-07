// inquiremodal.tsx
import React from 'react';
import styles from '@/styles/InquireModalStyle.module.css'; // Import the CSS module

// Define the props interface for InquireModal
interface InquireModalProps {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to call when the modal needs to be closed
}

const InquireModal: React.FC<InquireModalProps> = ({ isOpen, onClose }) => {
  // If the modal is not open, return null to render nothing
  if (!isOpen) {
    return null;
  }

  return (
    // Fixed container for the modal, covering the entire viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent overlay for the modal background.
          Clicking this overlay will close the modal. */}
      <div
        className="fixed inset-0 bg-black opacity-50 cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal content container.
          This div holds the actual content of the modal, positioned above the overlay. */}
      <div className={`bg-white rounded-xl shadow-2xl p-6 md:p-8 relative z-10 w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out ${styles.animateScaleIn}`}>
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className={`text-2xl font-bold text-gray-800 ${styles.fontInter}`}>Inquire Now</h2>
          {/* Close button for the modal.
              Uses a large 'times' symbol for easy clicking. */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body with Inquiry Information */}
        <div className={`mt-6 text-gray-700 space-y-4 ${styles.fontInter}`}>
          <p className="text-lg">
            For inquiries, please reach out to us through the following channels:
          </p>
          {/* Email contact information */}
          <div className="flex items-center space-x-3">
            {/* Email icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0l-4 4"
              />
            </svg>
            <a
              href="mailto:lifelonglearning@addu.edu.ph"
              className="text-blue-600 hover:underline text-base md:text-lg cursor-pointer"
            >
              lifelonglearning@addu.edu.ph
            </a>
          </div>
          {/* Phone contact information */}
          <div className="flex items-center space-x-3">
            {/* Phone icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-gray-800 text-base md:text-lg">
              082-221-2411 local 8414
            </span>
          </div>
          {/* Facebook link */}
          <div className="flex items-center space-x-3">
            <img
              src="/facebook-logo.png" // Path to the uploaded Facebook logo
              alt="Facebook Logo"
              className="h-6 w-6" 
            />
            <a
              href="https://www.facebook.com/addulifelonglearning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline text-base md:text-lg cursor-pointer"
            >
              Facebook Page
            </a>
          </div>
        </div>

        {/* Modal Footer with a "Got It!" button to close the modal */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 ease-in-out cursor-pointer ${styles.fontInter}`}
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquireModal;
