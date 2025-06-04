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
  viewedReceipt: string | null;
  onClose: () => void;
  onViewReceipt: (url: string) => void;
  onCloseReceipt: () => void;
  onConfirm: (email: string) => void;
}

const PendingModal: React.FC<PendingModalProps> = ({
  pendingModal,
  viewedReceipt,
  onClose,
  onViewReceipt,
  onCloseReceipt,
  onConfirm,
}) => {
  const [showValidation, setShowValidation] = useState(false);
  if (!pendingModal) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
            aria-label="Close pending modal"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold text-[#002B5C] mb-2">Pending Application</h3>
          <div className="mb-2 text-center">
            <span className="font-semibold text-[#002B5C] text-lg block">{pendingModal.name}</span>
            <span className="block text-sm text-gray-500">{pendingModal.email}</span>
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <span className="text-xs text-gray-700">Program: <span className="font-semibold text-[#002B5C]">{pendingModal.program}</span></span>
            <span className="text-xs text-gray-700">Payment: <span className="font-semibold text-[#002B5C]">{pendingModal.paymentType}</span></span>
          </div>
          <div className="mb-2 flex justify-center">
            <button
              className="text-[#002B5C] underline text-xs mb-2 hover:text-[#1a3d7c]"
              onClick={() => onViewReceipt(pendingModal.receiptUrl)}
            >
              View Receipt
            </button>
          </div>
          <button
            className="w-full bg-[#92D0D3] text-white py-2 rounded hover:bg-[#6bb7bb] transition font-semibold"
            onClick={() => setShowValidation(true)}
          >
            Confirm Enrollment
          </button>
        </div>
        {/* Validation Modal */}
        {showValidation && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xs flex flex-col gap-4 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowValidation(false)}
                aria-label="Close validation modal"
              >
                ✕
              </button>
              <h4 className="text-md font-bold text-[#002B5C] mb-2">Confirm Enrollment</h4>
              <p className="text-gray-700 mb-4 text-center">
                Do you want to confirm the enrollment of Mr./Ms {pendingModal.name}?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-[#92D0D3] text-white px-4 py-2 rounded hover:bg-[#6bb7bb] font-semibold"
                  onClick={() => {
                    setShowValidation(false);
                    onConfirm(pendingModal.email);
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-200 text-[#002B5C] px-4 py-2 rounded hover:bg-gray-300 font-semibold"
                  onClick={() => setShowValidation(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Receipt Modal */}
        {viewedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-xs w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={onCloseReceipt}
                aria-label="Close receipt modal"
              >
                ✕
              </button>
              {/* Use next/image for optimization if the receipt is a static asset, else fallback to img */}
              {viewedReceipt.endsWith('.jpg') || viewedReceipt.endsWith('.png') ? (
                <Image src={viewedReceipt} alt="Receipt" width={320} height={240} className="w-full rounded" />
              ) : (
                <img src={viewedReceipt} alt="Receipt" className="w-full rounded" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PendingModal;
