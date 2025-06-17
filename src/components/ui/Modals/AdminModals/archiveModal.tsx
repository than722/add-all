import React from 'react';

interface ArchiveModalProps {
  isOpen: boolean;
  type: 'instructor' | 'student' | 'program';
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, type, name, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  const typeLabel = type === 'instructor' ? 'Instructor' : type === 'student' ? 'Student' : 'Program';
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm">
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-[#08228d]">Archive {typeLabel}</h3>
        <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base">
          Are you sure you want to archive <span className="font-semibold">{name}</span>? This will remove them from the list.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-[#08228d] font-semibold hover:bg-gray-300 text-sm sm:text-base"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-700 text-sm sm:text-base"
            onClick={onConfirm}
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;
