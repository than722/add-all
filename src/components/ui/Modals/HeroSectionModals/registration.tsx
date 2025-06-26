'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { role } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
  const validateContact = (contact: string): boolean => /^[0-9\s\-()+]+$/.test(contact) && contact.trim().length >= 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFullNameError(null);
    setEmailError(null);
    setContactError(null);
    setPrivacyError(null);

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

    if (!agreedToPrivacy) {
      setPrivacyError('You must agree to the Data Privacy Act to register.');
      isValid = false;
    }

    if (isValid) {
      console.log('Registration Successful:', { fullName, email, contact, companyName, designation });

      if (role === 'student') {
        router.push('/student/allprograms');
      } else if (role === 'instructor') {
        router.push('/instructor/assignedprograms');
      } else if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'superadmin') {
        router.push('/superadmin');
      }

      setFullName('');
      setEmail('');
      setContact('');
      setCompanyName('');
      setDesignation('');
      setAgreedToPrivacy(false);

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-8 shadow-xl z-10 text-black">

        {/* X Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-red-500 cursor-pointer"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Form Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#1E3A5F]">Register</h2>

        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block text-black mb-1 font-semibold text-sm">Full Name</label>
            <input
              type="text"
              id="fullname"
              className={`w-full border rounded-lg px-3 py-2 text-sm text-black ${fullNameError ? 'border-red-500' : 'border-gray-300'}`}
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
            <label htmlFor="email" className="block text-black mb-1 font-semibold text-sm">Email</label>
            <input
              type="email"
              id="email"
              className={`w-full border rounded-lg px-3 py-2 text-sm text-black ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-black mb-1 font-semibold text-sm">Contact No.</label>
            <input
              type="tel"
              id="contact"
              className={`w-full border rounded-lg px-3 py-2 text-sm text-black ${contactError ? 'border-red-500' : 'border-gray-300'}`}
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setContactError(null);
              }}
            />
            {contactError && <p className="text-red-500 text-xs mt-1">{contactError}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-black mb-1 font-semibold text-sm">Company Name <span className="text-gray-500">(Optional)</span></label>
            <input
              type="text"
              id="companyName"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="block text-black mb-1 font-semibold text-sm">Designation <span className="text-gray-500">(Optional)</span></label>
            <input
              type="text"
              id="designation"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          {/* Data Privacy Checkbox */}
          <div className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              id="privacy"
              checked={agreedToPrivacy}
              onChange={(e) => setAgreedToPrivacy(e.target.checked)}
              className="mt-1 cursor-pointer"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-black">
              I agree to the{' '}
              <a
                href="https://privacy.gov.ph/data-privacy-act/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Data Privacy Act
              </a>{' '}
              and consent to the collection and use of my personal information.
            </label>
          </div>
          {privacyError && <p className="text-red-500 text-xs mt-1">{privacyError}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition text-sm"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
