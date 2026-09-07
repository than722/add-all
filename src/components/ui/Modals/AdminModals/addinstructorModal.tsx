'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const modalContentRef = useRef<HTMLDivElement>(null); // Ref for the modal content for animation

  // Animation state for modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      // Allow time for exit animation before unmounting
      const timer = setTimeout(() => setShowModal(false), 300); // Match this with your animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle closing on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!showModal && !isOpen) return null; // Only render when actually open or animating out

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
      onClose(); // Close the modal
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none' // pointer-events-none prevents interaction during fade-out
      }`}
    >
      <div
        ref={modalContentRef}
        className={`bg-white rounded-2xl shadow-xl p-4 sm:p-8 max-w-xs sm:max-w-xl w-full relative
          transition-all duration-300 transform
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold cursor-pointer transition-colors"
          onClick={onClose}
          aria-label="Close add instructor modal"
        >
          ×
        </button>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08228d] text-center mb-6">Add New Instructor</h2>

        <div className="flex flex-col items-center mb-6">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 transition-all duration-200
              ${imgError ? 'border-red-500' : 'border-[#08228d]'}
              mb-2 cursor-pointer hover:shadow-md`}
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
          <label
            htmlFor="profile-picture-upload"
            className={`cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full flex items-center text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${imgError ? 'border-2 border-red-500' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Profile Picture
          </label>
          {imgError && <p className="text-red-500 text-xs mt-1">{imgError}</p>}
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

          <button
            className="mt-6 w-full bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAdd}
          >
            Add Instructor
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInstructorModal;