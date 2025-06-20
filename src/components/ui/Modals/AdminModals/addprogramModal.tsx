'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface ProgramData {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  curriculum?: string[];
  thumbnail: string;
}

interface Instructor {
  name: string;
  email: string;
  img: string;
}

interface AddProgramModalProps {
  isOpen: boolean;
  mode?: 'add' | 'edit';
  newProgram: ProgramData;
  instructors: Instructor[];
  onChange: (field: string, value: any) => void;
  onThumbnailChange: (url: string) => void;
  onClose: () => void;
  onAdd?: () => void;
  onSave?: () => void;
  canAdd?: boolean;
}

const AddProgramModal: React.FC<AddProgramModalProps> = ({
  isOpen,
  mode = 'add',
  newProgram,
  instructors,
  onChange,
  onThumbnailChange,
  onClose,
  onAdd,
  onSave,
  canAdd,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [internalCanSubmit, setInternalCanSubmit] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    program: '',
    category: '',
    instructor: '',
    date: '',
    time: '',
    sessions: '',
    description: '',
    thumbnail: '',
  });

  const validateSessions = (sessions: string) => /^\d+$/.test(sessions) && parseInt(sessions) > 0;
  const validateDate = (date: string) => date.trim().length > 4;

  const validateForm = (showErrors = false) => {
    const e = { ...errors };
    let valid = true;

    if (!newProgram.program.trim()) {
      if (showErrors) e.program = 'Program name is required.';
      valid = false;
    } else e.program = '';

    if (!newProgram.category.trim()) {
      if (showErrors) e.category = 'Category is required.';
      valid = false;
    } else e.category = '';

    if (!newProgram.instructor.trim()) {
      if (showErrors) e.instructor = 'Instructor is required.';
      valid = false;
    } else e.instructor = '';

    if (!newProgram.date.trim() || !validateDate(newProgram.date)) {
      if (showErrors) e.date = 'Valid date is required.';
      valid = false;
    } else e.date = '';

    if (!newProgram.time.trim()) {
      if (showErrors) e.time = 'Time is required.';
      valid = false;
    } else e.time = '';

    if (!validateSessions(newProgram.sessions)) {
      if (showErrors) e.sessions = 'Sessions must be a positive number.';
      valid = false;
    } else e.sessions = '';

    if (!newProgram.description.trim()) {
      if (showErrors) e.description = 'Description is required.';
      valid = false;
    } else e.description = '';

    if (!newProgram.thumbnail.trim()) {
      if (showErrors) e.thumbnail = 'Thumbnail is required.';
      valid = false;
    } else e.thumbnail = '';

    setErrors(e);
    setInternalCanSubmit(valid);
    return valid;
  };

  useEffect(() => {
    if (formSubmitted) validateForm(true);
    else validateForm(false);
  }, [newProgram, formSubmitted]);

  useEffect(() => {
    if (isOpen) {
      setShowModalContent(true);
      setFormSubmitted(false);
      setErrors({
        program: '',
        category: '',
        instructor: '',
        date: '',
        time: '',
        sessions: '',
        description: '',
        thumbnail: '',
      });
    } else {
      setShowModalContent(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    setFormSubmitted(true);
    if (validateForm(true)) {
      mode === 'edit' ? onSave?.() : onAdd?.();
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onThumbnailChange(url);
      setErrors((prev) => ({ ...prev, thumbnail: '' }));
    }
  };

  if (!isOpen && !showModalContent) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out ${
          showModalContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-extrabold text-center text-[#08228d] mb-8 tracking-tight">
          {mode === 'edit' ? 'Edit Program Details' : 'Add New Program'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[{ label: 'Program Name', key: 'program' },
            { label: 'Time', key: 'time' },
            { label: 'Category', key: 'category' },
            { label: 'Sessions', key: 'sessions', type: 'number' }].map(({ label, key, type }) => (
              <div key={key}>
                <label className="text-sm font-semibold text-gray-700 block mb-1">{label}</label>
                <input
                  type={type || 'text'}
                  value={(newProgram as any)[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={`mt-1 w-full px-4 py-2.5 rounded-md border border-gray-300 text-base bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors[key as keyof typeof errors] ? 'border-red-500 ring-red-500' : ''
                  }`}
                />
                {errors[key as keyof typeof errors] && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {errors[key as keyof typeof errors]}
                  </p>
                )}
              </div>
            ))}

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Instructor</label>
            <select
              className={`mt-1 w-full px-4 py-2.5 rounded-md border border-gray-300 text-base bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.instructor ? 'border-red-500 ring-red-500' : ''
              }`}
              value={newProgram.instructor}
              onChange={(e) => onChange('instructor', e.target.value)}
            >
              <option value="">Select Instructor</option>
              {instructors.map((i) => (
                <option key={i.email} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            {errors.instructor && (
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.instructor}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Date</label>
            <input
              type="text"
              className={`mt-1 w-full px-4 py-2.5 rounded-md border border-gray-300 text-base bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.date ? 'border-red-500 ring-red-500' : ''
              }`}
              value={newProgram.date}
              placeholder="e.g., June 15, 2025"
              onChange={(e) => onChange('date', e.target.value)}
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.date}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 block mb-1">About Program</label>
          <textarea
            className={`w-full mt-1 px-4 py-2.5 rounded-md border border-gray-300 bg-gray-50 text-base text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.description ? 'border-red-500 ring-red-500' : ''
            }`}
            rows={4}
            value={newProgram.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Provide a detailed description of the program..."
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.description}
            </p>
          )}
        </div>

        {/* Curriculum as array input */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Curriculum Modules (optional)</label>
          {(newProgram.curriculum || []).map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updated = [...(newProgram.curriculum || [])];
                  updated[index] = e.target.value;
                  onChange('curriculum', updated);
                }}
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-gray-50 text-base text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={`Module ${index + 1} title`}
              />
              <button
                type="button"
                onClick={() => {
                  const updated = [...(newProgram.curriculum || [])];
                  updated.splice(index, 1);
                  onChange('curriculum', updated);
                }}
                className="p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                title="Remove module"
              >
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updated = [...(newProgram.curriculum || []), ''];
              onChange('curriculum', updated);
            }}
            className="mt-2 text-base text-blue-600 hover:underline flex items-center font-medium cursor-pointer"
          >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Module
          </button>
        </div>

        {/* Thumbnail */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Thumbnail</label>
          {newProgram.thumbnail && (
            <Image
              src={newProgram.thumbnail}
              alt="Thumbnail Preview"
              width={192}
              height={128}
              className="rounded-lg border border-gray-200 mb-4 object-cover shadow-sm"
            />
          )}
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="block w-full text-sm text-gray-800
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 cursor-pointer"
          />
          {errors.thumbnail && (
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.thumbnail}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-[#08228d] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleSubmit}
            disabled={typeof canAdd === 'boolean' ? !canAdd : !internalCanSubmit}
          >
            {mode === 'edit' ? 'Save Changes' : 'Add Program'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProgramModal;