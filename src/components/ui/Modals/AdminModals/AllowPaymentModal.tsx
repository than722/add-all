import React from 'react';

interface AllowPaymentModalProps {
  isOpen: boolean;
  programName: string;
  onValidate: () => void;
  onClose: () => void;
}

const AllowPaymentModal: React.FC<AllowPaymentModalProps> = ({ isOpen, programName, onValidate, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm">
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-[#08228d]">Allow Payment</h3>
        <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base">
          Allow payment for <span className="font-semibold">{programName}</span> students?
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-[#08228d] font-semibold hover:bg-gray-300 text-sm sm:text-base cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-800 text-sm sm:text-base cursor-pointer"
            onClick={onValidate}
          >
            Validate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllowPaymentModal;
