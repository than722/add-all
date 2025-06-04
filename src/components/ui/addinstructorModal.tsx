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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl flex flex-col md:flex-row gap-6 relative">
        {/* Profile Info (top) */}
        <div className="w-full flex flex-col items-center justify-center">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <div
            className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-[#002B5C] mb-2 cursor-pointer mt-2"
            onClick={() => fileInputRef.current?.click()}
            title="Upload profile picture"
          >
            {img ? (
              <Image src={img} alt="Profile Preview" width={96} height={96} className="object-cover w-24 h-24" />
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
          <span className="text-xs text-gray-500 mb-4">Click to upload profile picture</span>
          <h2 className="text-lg font-bold text-[#002B5C] mb-2 mt-2">Add Instructor</h2>
          {/* Form fields below profile info */}
          <div className="w-full max-w-xs mx-auto mt-4 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
              value={contact}
              onChange={e => setContact(e.target.value)}
            />
            <button
              className="mt-4 w-full bg-[#002B5C] text-white py-2 rounded hover:bg-[#1a3d7c] font-semibold disabled:opacity-50"
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
