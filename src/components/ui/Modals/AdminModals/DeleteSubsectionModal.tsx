import React from 'react';

interface DeleteSubsectionModalProps {
  isOpen: boolean;
  subsectionName: string; // The name of the subsection to be deleted
  onConfirm: () => void; // Function to call when delete is confirmed
  onCancel: () => void; // Function to call when delete is cancelled
}

/**
 * DeleteSubsectionModal component provides a confirmation dialog for deleting a subsection.
 * It takes the subsection's name, and functions for confirmation and cancellation.
 * The design is consistent with ArchiveModal.tsx.
 */
const DeleteSubsectionModal: React.FC<DeleteSubsectionModalProps> = ({ isOpen, subsectionName, onConfirm, onCancel }) => {
  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    // Overlay for the modal, covers the entire screen with a semi-transparent black background
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      {/* Modal content container */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm">
        {/* Modal title */}
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-[#08228d]">Delete Subsection</h3>
        {/* Modal message explaining the action */}
        <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base">
          Are you sure you want to delete the subsection <span className="font-semibold">{subsectionName}</span>? This action cannot be undone.
        </p>
        {/* Action buttons (Cancel and Delete) */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
          {/* Cancel button */}
          <button
            className="px-4 py-2 rounded bg-gray-200 text-[#08228d] font-semibold hover:bg-gray-300 text-sm sm:text-base cursor-pointer transition-colors duration-200"
            onClick={onCancel} // Call onCancel when clicked
          >
            Cancel
          </button>
          {/* Delete button */}
          <button
            className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-700 text-sm sm:text-base cursor-pointer transition-colors duration-200"
            onClick={onConfirm} // Call onConfirm when clicked
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubsectionModal;
