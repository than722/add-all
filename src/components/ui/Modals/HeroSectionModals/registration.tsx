import React, { useState } from 'react';

/**
 * A modal component for user registration.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} [props.onRegister] - Optional callback function to handle successful registration.
 * @returns {JSX.Element | null} The rendered modal component or null if not open.
 */
export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (userData: {
    fullName: string;
    email: string;
    contact: string;
    companyName: string;
    designation: string;
  }) => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateContact = (contact: string): boolean => {
    return /^[0-9\s\-()+]+$/.test(contact) && contact.trim().length >= 7;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFullNameError(null);
    setEmailError(null);
    setContactError(null);

    let isValid = true;

    if (!fullName.trim()) {
      setFullNameError('Full Name is required.');
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
      setContactError('Contact Number is required.');
      isValid = false;
    } else if (!validateContact(contact)) {
      setContactError('Please enter a valid contact number (min 7 digits).');
      isValid = false;
    }

    if (isValid) {
      const userData = {
        fullName,
        email,
        contact,
        companyName: companyName.trim() !== '' ? companyName : 'N/A',
        designation: designation.trim() !== '' ? designation : 'N/A',
      };

      if (onRegister) onRegister(userData);

      console.log('Registration successful:', userData);

      setFullName('');
      setEmail('');
      setContact('');
      setCompanyName('');
      setDesignation('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#1E3A5F]">
          Register
        </h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block text-gray-700 mb-1 font-semibold text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={`w-full border rounded-lg px-3 py-2 text-sm ${fullNameError ? 'border-red-500' : 'border-gray-300'}`}
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameError(null);
              }}
            />
            {fullNameError && <p className="text-red-500 text-xs mt-1">{fullNameError}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full border rounded-lg px-3 py-2 text-sm ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Contact No */}
          <div>
            <label htmlFor="contact" className="block text-gray-700 mb-1 font-semibold text-sm">
              Contact No.
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              className={`w-full border rounded-lg px-3 py-2 text-sm ${contactError ? 'border-red-500' : 'border-gray-300'}`}
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setContactError(null);
              }}
            />
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </div>

          {/* Company Name (Optional) */}
          <div>
            <label htmlFor="companyName" className="block text-gray-700 mb-1 font-semibold text-sm">
              Company Name <span className="text-gray-500">(Optional - type N/A if not applicable)</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Designation (Optional) */}
          <div>
            <label htmlFor="designation" className="block text-gray-700 mb-1 font-semibold text-sm">
              Designation <span className="text-gray-500">(Optional - type N/A if not applicable)</span>
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
