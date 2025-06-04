import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (admin: {
    name: string;
    email: string;
    contact: string;
    img: string;
    position: string;
  }) => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [img, setImg] = useState('');
  const [position, setPosition] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (name && email && contact && position) {
      onAdd({ name, email, contact, img, position });
      setName('');
      setEmail('');
      setContact('');
      setImg('');
      setPosition('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl flex flex-col items-center relative">
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
        <h2 className="text-lg font-bold text-[#002B5C] mb-2 mt-2">Employee</h2>
        <div className="w-full max-w-xs mx-auto mt-4 space-y-4">
          <label className="block text-sm font-semibold text-[#002B5C]">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label className="block text-sm font-semibold text-[#002B5C]">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label className="block text-sm font-semibold text-[#002B5C]">Contact Info</label>
          <input
            type="text"
            placeholder="Contact Number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
            value={contact}
            onChange={e => setContact(e.target.value)}
          />
          <label className="block text-sm font-semibold text-[#002B5C]">Position</label>
          <input
            type="text"
            placeholder="Position (e.g. Employee, Manager)"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002B5C] text-gray-900"
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
          <button
            className="mt-4 w-full bg-[#002B5C] text-white py-2 rounded hover:bg-[#1a3d7c] font-semibold disabled:opacity-50"
            onClick={handleAdd}
            disabled={!name || !email || !contact || !position}
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
