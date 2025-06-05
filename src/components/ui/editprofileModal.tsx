import React, { useState } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: { name: string; contactNo: string };
  onSave: (updated: { name: string; contactNo: string }) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, profile, onSave }) => {
  const [name, setName] = useState(profile.name);
  const [contactNo, setContactNo] = useState(profile.contactNo);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactNo.trim()) {
      setError('Both fields are required.');
      return;
    }
    setError(null);
    onSave({ name, contactNo });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md relative">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 focus:outline-none text-xl sm:text-2xl"
        >
          ✕
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-[#002B5C] mb-3 sm:mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3] text-gray-900 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-sm">Contact No.</label>
            <input
              type="text"
              value={contactNo}
              onChange={e => setContactNo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#92D0D3] text-gray-900 text-sm"
              required
            />
          </div>
          {error && <div className="text-red-600 text-xs sm:text-sm">{error}</div>}
          <div className="flex gap-2 mt-3 sm:mt-4">
            <button
              type="button"
              className="flex-1 bg-gray-200 text-[#002B5C] py-2 rounded hover:bg-gray-300 transition text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#002B5C] text-white py-2 rounded hover:bg-[#1a3d7c] transition text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
