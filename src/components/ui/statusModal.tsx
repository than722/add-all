import React from 'react';

interface StatusModalProps {
  isOpen: boolean;
  instructorName: string;
  statusToSet: 'active' | 'inactive';
  onConfirm: () => void;
  onCancel: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  instructorName,
  statusToSet,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  const statusText = statusToSet === 'active' ? 'Active' : 'Inactive';
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="absolute inset-0" onClick={onCancel}></div>
      <div className="relative bg-white rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-[#002B5C]">Confirmation</h3>
        <p className="mb-4 sm:mb-6 text-gray-700 text-center text-sm sm:text-base">
          Are you sure you want to set as {statusText} for Mr./Ms. {instructorName}?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <button
            className="bg-[#002B5C] text-white px-4 py-2 rounded hover:bg-[#1a3d7c] text-sm sm:text-base"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 text-[#002B5C] px-4 py-2 rounded hover:bg-gray-300 text-sm sm:text-base"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
