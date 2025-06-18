'use client';

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
  const [img, setImg] = useState<string>(''); // Holds the Data URL for preview
  const [imgFile, setImgFile] = useState<File | null>(null); // State for the actual file, if needed for upload

  // State for validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [imgError, setImgError] = useState(''); // For image validation

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
      setImgFile(file); // Store the file itself
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string); // Set for local preview
      };
      reader.readAsDataURL(file);
      setImgError(''); // Clear image error when a file is selected
    } else {
      setImgFile(null);
      setImg('');
      setImgError('Profile picture is required.'); // Set error if file is deselected
    }
  };

  const handleAdd = () => {
    // Reset all errors at the start of validation
    setNameError('');
    setEmailError('');
    setContactError('');
    setImgError('');

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

    // You might want to make the image optional or required based on your needs.
    // Here, I'm making it required.
    if (!img) {
      setImgError('Profile picture is required.');
      isValid = false;
    }

    if (isValid) {
      // Pass the necessary instructor data.
      // If you're uploading the image to a server, you'd send `imgFile` here
      // and get back a URL to store as `img`. For now, we're using the data URL.
      onAdd({ name, email, contact, img: img || '/profileicon.png' });
      // Reset form fields and preview upon successful add
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
        <button
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 ${imgError ? 'border-red-500' : 'border-[#08228d]'} mb-2 cursor-pointer mt-2`}
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
        <span className="text-xs text-gray-500 mb-1 sm:mb-2">Click to upload profile picture</span>
        {imgError && <p className="text-red-500 text-xs mb-3 sm:mb-4">{imgError}</p>}

        <h2 className="text-base sm:text-lg font-bold text-[#08228d] mb-2 mt-2">Add Instructor</h2>
        <div className="w-full max-w-xs mx-auto mt-2 sm:mt-4 space-y-3 sm:space-y-4">
          {/* Full Name Input */}
          <label className="block text-xs sm:text-sm font-semibold text-[#08228d]">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${nameError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#08228d]'} text-gray-900 text-xs sm:text-base`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(''); // Clear error when typing
            }}
          />
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}

          {/* Email Input */}
          <label className="block text-xs sm:text-sm font-semibold text-[#08228d]">Email</label>
          <input
            type="email"
            placeholder="Email"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#08228d]'} text-gray-900 text-xs sm:text-base`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(''); // Clear error when typing
            }}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

          {/* Contact Info Input */}
          <label className="block text-xs sm:text-sm font-semibold text-[#08228d]">Contact Info</label>
          <input
            type="text"
            placeholder="Contact Number"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${contactError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#08228d]'} text-gray-900 text-xs sm:text-base`}
            value={contact}
            onChange={e => {
              setContact(e.target.value);
              setContactError(''); // Clear error when typing
            }}
          />
          {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}

          <button
            className="mt-3 sm:mt-4 w-full bg-[#08228d] text-white py-2 rounded hover:bg-[#1a3d7c] font-semibold disabled:opacity-50 text-xs sm:text-base"
            onClick={handleAdd}
          >
            Add Instructor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInstructorModal;