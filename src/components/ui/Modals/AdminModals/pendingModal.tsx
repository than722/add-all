'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
  program: string;
}

interface PendingModalProps {
  pendingModal: PendingApplication | null;
  // removed viewedReceipt prop
  onClose: () => void;
  // onConfirm now takes email and program to pass back to parent
  onConfirm: (email: string, program: string) => void;
}

const PendingModal: React.FC<PendingModalProps> = ({
  pendingModal,
  onClose,
  onConfirm,
}) => {
  // Internal state for controlling the visibility of the receipt image
  const [showReceiptImage, setShowReceiptImage] = useState(false);
  // Internal state for controlling the visibility of the validation modal
  const [showValidation, setShowValidation] = useState(false);

  if (!pendingModal) return null;

  // Handler to show the receipt image
  const handleViewReceipt = () => {
    setShowReceiptImage(true);
  };

  // Handler to close the receipt image
  const handleCloseReceipt = () => {
    setShowReceiptImage(false);
  };

  // Handler for the final confirmation of enrollment
  const handleFinalConfirmEnrollment = () => {
    setShowValidation(false); // Close validation modal
    // Call the parent's onConfirm with email and program
    onConfirm(pendingModal.email, pendingModal.program);
    setShowReceiptImage(false); // Also hide receipt if it was open
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md flex flex-col gap-3 sm:gap-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => {
              onClose(); // Close the main pending modal
              setShowValidation(false); // Ensure validation modal is hidden
              setShowReceiptImage(false); // Ensure receipt image is hidden
            }}
            aria-label="Close pending modal"
          >
            ✕
          </button>
          <h3 className="text-base sm:text-lg font-bold text-[#08228d] mb-1 sm:mb-2">Pending Application</h3>
          <div className="mb-1 sm:mb-2 text-center">
            <span className="font-semibold text-[#08228d] text-base sm:text-lg block">{pendingModal.name}</span>
            <span className="block text-xs sm:text-sm text-gray-500">{pendingModal.email}</span>
          </div>
          <div className="mb-1 sm:mb-2 flex flex-col gap-1">
            <span className="text-xs text-gray-700">Program: <span className="font-semibold text-[#08228d]">{pendingModal.program}</span></span>
            <span className="text-xs text-gray-700">Payment: <span className="font-semibold text-[#08228d]">{pendingModal.paymentType}</span></span>
          </div>
          <div className="mb-1 sm:mb-2 flex justify-center">
            <button
              className="text-[#08228d] underline text-xs mb-2 hover:text-[#1a3d7c]"
              onClick={handleViewReceipt} // Call internal handler to show receipt
            >
              View Receipt
            </button>
          </div>
          <button
            className="w-full bg-[#92D0D3] text-white py-2 rounded hover:bg-[#6bb7bb] transition font-semibold text-xs sm:text-base"
            onClick={() => setShowValidation(true)} // Show the validation modal
          >
            Confirm Enrollment
          </button>
        </div>
      </div>

      {/* Validation Modal - Moved inside the main PendingModal's render */}
      {showValidation && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs flex flex-col gap-3 sm:gap-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowValidation(false)}
              aria-label="Close validation modal"
            >
              ✕
            </button>
            <h4 className="text-sm sm:text-md font-bold text-[#08228d] mb-1 sm:mb-2">Confirm Enrollment</h4>
            <p className="text-gray-700 mb-2 sm:mb-4 text-center text-xs sm:text-base">
              Do you want to confirm the enrollment of Mr./Ms {pendingModal.name}?
            </p>
            <div className="flex gap-2 sm:gap-4 justify-center">
              <button
                className="bg-[#92D0D3] text-white px-3 sm:px-4 py-2 rounded hover:bg-[#6bb7bb] font-semibold text-xs sm:text-base"
                onClick={handleFinalConfirmEnrollment} // Call the final confirmation handler
              >
                Yes
              </button>
              <button
                className="bg-gray-200 text-[#08228d] px-3 sm:px-4 py-2 rounded hover:bg-gray-300 font-semibold text-xs sm:text-base"
                onClick={() => setShowValidation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal - Moved inside the main PendingModal's render */}
      {showReceiptImage && ( // Condition now uses internal state
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-xs w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={handleCloseReceipt} // Call internal handler to close receipt
              aria-label="Close receipt modal"
            >
              ✕
            </button>
            {/* Use next/image for optimization if the receipt is a static asset, else fallback to img */}
            {pendingModal.receiptUrl.endsWith('.jpg') || pendingModal.receiptUrl.endsWith('.png') || pendingModal.receiptUrl.startsWith('/') ? (
              <Image src={pendingModal.receiptUrl} alt="Receipt" width={320} height={240} className="w-full rounded" />
            ) : (
              <img src={pendingModal.receiptUrl} alt="Receipt" className="w-full rounded" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PendingModal;