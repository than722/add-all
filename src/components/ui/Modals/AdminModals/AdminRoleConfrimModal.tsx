'use client';

import React from 'react';

interface AdminRoleConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  actionType: 'add' | 'remove'; // 'add' for adding role, 'remove' for removing role
  onConfirm: () => void;
  isAdmin?: boolean; // Optional prop to indicate if the user is an admin
}

const AdminRoleConfirmModal: React.FC<AdminRoleConfirmModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  actionType,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const title = actionType === 'add' ? 'Confirm Add Admin Role' : 'Confirm Remove Admin Role';
  const message =
    actionType === 'add'
      ? `Are you sure you want to grant admin privileges to ${userName} (${userEmail})?`
      : `Are you sure you want to revoke admin privileges from ${userName} (${userEmail})?`;
  const confirmButtonText = actionType === 'add' ? 'Grant Admin' : 'Revoke Admin';
  const confirmButtonClass = actionType === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full relative">
        <h3 className="text-lg font-bold mb-4 text-[#08228d] text-center">{title}</h3>
        <p className="mb-6 text-gray-700 text-center">{message}</p>
        <div className="flex justify-center space-x-3">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${confirmButtonClass} text-white px-4 py-2 rounded transition font-semibold cursor-pointer`}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRoleConfirmModal;