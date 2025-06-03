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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onCancel}></div>
      <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-xl z-10">
        <h3 className="text-lg font-bold mb-4 text-[#002B5C]">Confirmation</h3>
        <p className="mb-6 text-gray-700 text-center">
          Are you sure you want to set as {statusText} for Mr./Ms. {instructorName}?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-[#002B5C] text-white px-4 py-2 rounded hover:bg-[#1a3d7c]"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 text-[#002B5C] px-4 py-2 rounded hover:bg-gray-300"
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
