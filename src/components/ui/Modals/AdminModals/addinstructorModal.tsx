import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface AddInstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (instructor: {
    name: string;
    email: string;
    contact: string;
    img: string;
  }) => void;
}

const AddInstructorModal: React.FC<AddInstructorModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [img, setImg] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (name && email && contact) {
      onAdd({ name, email, contact, img });
      setName('');
      setEmail('');
      setContact('');
      setImg('');
      setImgFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-xs sm:max-w-2xl flex flex-col items-center relative">
        {/* Profile Info (top) */}
        <div className="w-full flex flex-col items-center justify-center">
          <button
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-[#08228d] mb-2 cursor-pointer mt-2"
            onClick={() => fileInputRef.current?.click()}
            title="Upload profile picture"
          >
            {img ? (
              <Image src={img} alt="Profile Preview" width={96} height={96} className="object-cover w-full h-full" />
            ) : (
              <Image src="/profileicon.png" alt="Profile Placeholder" width={64} height={64} className="opacity-60" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="text-xs text-gray-500 mb-3 sm:mb-4">Click to upload profile picture</span>
          <h2 className="text-base sm:text-lg font-bold text-[#08228d] mb-2 mt-2">Add Instructor</h2>
          {/* Form fields below profile info */}
          <div className="w-full max-w-xs mx-auto mt-2 sm:mt-4 space-y-3 sm:space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#08228d] text-gray-900 text-xs sm:text-base"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#08228d] text-gray-900 text-xs sm:text-base"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#08228d] text-gray-900 text-xs sm:text-base"
              value={contact}
              onChange={e => setContact(e.target.value)}
            />
            <button
              className="mt-3 sm:mt-4 w-full bg-[#08228d] text-white py-2 rounded hover:bg-[#1a3d7c] font-semibold disabled:opacity-50 text-xs sm:text-base"
              onClick={handleAdd}
              disabled={!name || !email || !contact}
            >
              Add Instructor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructorModal;
