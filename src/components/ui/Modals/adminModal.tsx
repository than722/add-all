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
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md min-w-[320px] flex flex-col items-center relative animate-fade-in">
        <h3 className="text-base sm:text-lg font-bold mb-4 text-[#08228d] text-center">
          {isAdmin
            ? `Are you sure you want to remove Mr./Ms. ${name} role as an admin?`
            : `Are you sure you want to set Mr./Ms. ${name} as an admin?`}
        </h3>
        <div className="flex flex-row justify-center gap-4 mt-4 w-full">
          <button
            className="bg-[#08228d] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#001f40] text-base w-24"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-[#08228d] px-6 py-2 rounded-full font-semibold hover:bg-gray-400 text-base w-24"
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
