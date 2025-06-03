import React from 'react';
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
  if (!pendingModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClose}
            aria-label="Close pending modal"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold mb-2 text-[#002B5C]">Pending Application</h3>
          <div className="mb-2">
            <span className="font-semibold">{pendingModal.name}</span>
            <span className="block text-gray-500 text-sm">{pendingModal.email}</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-700">Program: {pendingModal.program}</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-700">Payment: {pendingModal.paymentType}</span>
          </div>
          <div className="mb-2">
            <button
              className="text-[#002B5C] underline text-xs mb-2"
              onClick={() => onViewReceipt(pendingModal.receiptUrl)}
            >
              View Receipt
            </button>
          </div>
          <button
            className="bg-[#92D0D3] text-white px-4 py-2 rounded hover:bg-[#6bb7bb] transition w-full"
            onClick={() => onConfirm(pendingModal.email)}
          >
            Confirm Enrollment
          </button>
        </div>
        {/* Receipt Modal */}
        {viewedReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
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
