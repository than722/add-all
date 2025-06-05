import React from "react";

interface AdminModalProps {
  isOpen: boolean;
  isAdmin: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, isAdmin, name, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-2xl flex flex-col gap-4 sm:gap-6">
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-[#002B5C]">
          {isAdmin
            ? `Are you sure you want to remove Mr./Ms. ${name} role as an admin?`
            : `Are you sure you want to set Mr./Ms. ${name} as an admin?`}
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 sm:mt-6">
          <button
            className="bg-[#002B5C] text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-[#001f40] text-sm sm:text-base"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-[#002B5C] px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-gray-400 text-sm sm:text-base"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
