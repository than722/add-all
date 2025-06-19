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
  onClose: () => void;
  onConfirm: (email: string, program: string) => void;
  // onDecline prop has been removed
}

const PendingModal: React.FC<PendingModalProps> = ({
  pendingModal,
  onClose,
  onConfirm,
  // onDecline is no longer destructured here
}) => {
  const [showReceiptImage, setShowReceiptImage] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  if (!pendingModal) return null;

  const handleViewReceipt = () => {
    setShowReceiptImage(true);
  };

  const handleCloseReceipt = () => {
    setShowReceiptImage(false);
  };

  const handleFinalConfirmEnrollment = () => {
    setShowValidation(false); // Close validation modal
    onConfirm(pendingModal.email, pendingModal.program);
    setShowReceiptImage(false); // Also hide receipt if it was open
  };

  // handleDeclineEnrollment logic has been removed

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm flex flex-col gap-5 relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scale-in">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold cursor-pointer transition-colors"
            onClick={() => {
              onClose();
              setShowValidation(false);
              setShowReceiptImage(false);
            }}
            aria-label="Close pending modal"
          >
            ✕
          </button>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#08228d] text-center mb-2">Pending Application</h3>

          <div className="text-center">
            <p className="font-bold text-[#08228d] text-lg sm:text-xl">{pendingModal.name}</p>
            <p className="text-sm sm:text-base text-gray-600">{pendingModal.email}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-700">Program: <span className="font-semibold text-[#08228d]">{pendingModal.program}</span></p>
            <p className="text-sm text-gray-700">Payment: <span className="font-semibold text-[#08228d]">{pendingModal.paymentType}</span></p>
          </div>

          <button
            className="text-[#08228d] text-sm font-medium underline hover:text-[#1a3d7c] transition-colors duration-200 cursor-pointer"
            onClick={handleViewReceipt}
          >
            View Receipt
          </button>

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-bold text-base sm:text-lg cursor-pointer shadow-md hover:shadow-lg"
            onClick={() => setShowValidation(true)} // Show the validation modal
          >
            Confirm Enrollment
          </button>
          {/* Decline button and its onClick handler have been removed */}
        </div>
      </div>

      {/* Validation Modal */}
      {showValidation && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-xs flex flex-col gap-5 relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scale-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold cursor-pointer transition-colors"
              onClick={() => setShowValidation(false)}
              aria-label="Close validation modal"
            >
              ✕
            </button>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#08228d] text-center mb-2">Confirm Enrollment</h4>
            <p className="text-gray-700 text-center text-sm sm:text-base">
              Do you want to confirm the enrollment of Mr./Ms <span className="font-semibold">{pendingModal.name}</span>?
            </p>
            <div className="flex gap-4 sm:gap-6 justify-center">
              <button
                className="bg-green-600 text-white px-5 sm:px-6 py-2.5 rounded-lg hover:bg-green-700 font-bold text-base sm:text-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
                onClick={handleFinalConfirmEnrollment}
              >
                Yes
              </button>
              <button
                className="bg-gray-200 text-[#08228d] px-5 sm:px-6 py-2.5 rounded-lg hover:bg-gray-300 font-bold text-base sm:text-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setShowValidation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptImage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scale-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold cursor-pointer transition-colors"
              onClick={handleCloseReceipt}
              aria-label="Close receipt modal"
            >
              ✕
            </button>
            {pendingModal.receiptUrl.endsWith('.jpg') || pendingModal.receiptUrl.endsWith('.png') || pendingModal.receiptUrl.startsWith('/') ? (
              <Image
                src={pendingModal.receiptUrl}
                alt="Receipt"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg object-contain"
                quality={85}
              />
            ) : (
              <img src={pendingModal.receiptUrl} alt="Receipt" className="w-full h-auto rounded-lg object-contain" />
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PendingModal;