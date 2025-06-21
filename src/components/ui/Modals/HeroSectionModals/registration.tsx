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
  onRegister, // Added an optional onRegister prop for parent communication
}: {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (userData: { fullName: string; email: string; contact: string }) => void;
}) {
  // State for form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  // State for validation errors
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  // Helper function to validate email format
  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Helper function to validate contact number (basic check for digits, could be expanded)
  const validateContact = (contact: string): boolean => {
    // Allows for basic digits, spaces, hyphens, and parentheses
    return /^[0-9\s\-()+]+$/.test(contact) && contact.trim().length >= 7; // Minimum 7 digits
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset all errors at the start of validation
    setFullNameError(null);
    setEmailError(null);
    setContactError(null);

    let isValid = true;

    // Validate Full Name
    if (!fullName.trim()) {
      setFullNameError('Full Name is required.');
      isValid = false;
    }

    // Validate Email
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate Contact No.
    if (!contact.trim()) {
      setContactError('Contact Number is required.');
      isValid = false;
    } else if (!validateContact(contact)) {
      setContactError('Please enter a valid contact number (digits, spaces, hyphens, parentheses allowed, min 7 digits).');
      isValid = false;
    }

    if (isValid) {
      // If validation passes, call the onRegister callback (if provided)
      if (onRegister) {
        onRegister({ fullName, email, contact });
      }
      // Log for demonstration
      console.log('Registration successful:', { fullName, email, contact });

      // Clear the form and close the modal
      setFullName('');
      setEmail('');
      setContact('');
      onClose();
    }
  };

  // Return null to prevent rendering the modal when it is not open
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
          <div>
            <label htmlFor="fullname" className="block text-gray-700 mb-1 font-semibold text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 text-sm ${fullNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}`}
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setFullNameError(null); // Clear error on change
              }}
            />
            {fullNameError && <p className="text-red-500 text-xs mt-1">{fullNameError}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 text-sm ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#92D0D3]'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null); // Clear error on change
              }}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="contact" className="block text-gray-700 mb-1 font-semibold text-sm">
              Contact No.
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="contact"
              name="contact"
              className={`w-full border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 text-sm ${contactError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#92D0D3]'}`}
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setContactError(null); // Clear error on change
              }}
            />
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
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