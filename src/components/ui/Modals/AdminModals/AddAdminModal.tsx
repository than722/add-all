'use client';

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
  const [tempImgPreview, setTempImgPreview] = useState<string | null>(null);
  const [position, setPosition] = useState('');

  // State for validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [positionError, setPositionError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Helper function to validate email format
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Helper function to validate contact number (basic check for digits)
  const validateContact = (contact: string) => {
    return /^\d+$/.test(contact);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    // Reset all errors at the start of validation
    setNameError('');
    setEmailError('');
    setContactError('');
    setPositionError('');

    let isValid = true;

    if (!name.trim()) {
      setNameError('Full Name is required.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!contact.trim()) {
      setContactError('Contact Info is required.');
      isValid = false;
    } else if (!validateContact(contact)) {
      setContactError('Contact Info must contain only digits.');
      isValid = false;
    }

    if (!position.trim()) {
      setPositionError('Position is required.');
      isValid = false;
    }

    if (isValid) {
      onAdd({ name, email, contact, position, img: tempImgPreview || '/profileicon.png' });
      // Reset form fields and preview upon successful add
      setName('');
      setEmail('');
      setContact('');
      setTempImgPreview(null);
      setPosition('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 max-w-xs sm:max-w-xl w-full relative">
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold cursor-pointer transition-colors"
          onClick={onClose}
          aria-label="Close add admin modal"
        >
          ×
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08228d] text-center mb-6">Add New Employee</h2>

        <div className="flex flex-col items-center mb-6">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-[#08228d] mb-2 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={() => fileInputRef.current?.click()}
            title="Upload profile picture"
          >
            {tempImgPreview ? (
              <Image src={tempImgPreview} alt="Profile Preview" width={96} height={96} className="object-cover w-full h-full" />
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
          <label
            htmlFor="profile-picture-upload" // Use htmlFor to link to input
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full flex items-center text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => fileInputRef.current?.click()} // Keep onClick for direct trigger
          >
            Upload Profile Picture
          </label>
        </div>

        <div className="w-full max-w-sm mx-auto space-y-4 sm:space-y-5">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Full Name:</label>
            <input
              type="text"
              placeholder="Enter full name"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${nameError ? 'border-red-500' : ''}`}
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameError('');
              }}
            />
            {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              placeholder="Enter email address"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${emailError ? 'border-red-500' : ''}`}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setEmailError('');
              }}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Contact Info Input */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Contact Info:</label>
            <input
              type="text"
              placeholder="Enter contact number"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${contactError ? 'border-red-500' : ''}`}
              value={contact}
              onChange={e => {
                setContact(e.target.value);
                setContactError('');
              }}
            />
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </div>

          {/* Position Input */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-1">Position:</label>
            <input
              type="text"
              placeholder="e.g., Employee, Manager"
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${positionError ? 'border-red-500' : ''}`}
              value={position}
              onChange={e => {
                setPosition(e.target.value);
                setPositionError('');
              }}
            />
            {positionError && <p className="text-red-500 text-xs mt-1">{positionError}</p>}
          </div>

          <button
            className="mt-6 w-full bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAdd}
          >
            Add Employee
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;