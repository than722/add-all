import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface AddProgramModalProps {
  isOpen: boolean;
  newProgram: {
    program: string;
    category: string;
    instructor: string;
    date: string;
    time: string;
    sessions: string;
    description: string;
    curriculum?: string;
    thumbnail: string;
  };
  instructors: Array<{ name: string; email: string; img: string }>;
  onChange: (field: string, value: string) => void;
  onThumbnailChange: (url: string) => void;
  onClose: () => void;
  onAdd: () => void;
  canAdd: boolean; // This prop will now be managed by the internal validation
}

const AddProgramModal: React.FC<AddProgramModalProps> = ({
  isOpen,
  newProgram,
  instructors,
  onChange,
  onThumbnailChange,
  onClose,
  onAdd,
  // canAdd is now handled internally, so we don't destructure it here directly for button
}) => {
  // State for validation errors
  const [programNameError, setProgramNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [instructorError, setInstructorError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [sessionsError, setSessionsError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');

  // New state to track if the form has been submitted (or an attempt made)
  const [formSubmitted, setFormSubmitted] = useState(false);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Helper function to validate sessions (basic check for digits)
  const validateSessions = (sessions: string) => {
    return /^\d+$/.test(sessions) && parseInt(sessions) > 0;
  };

  // Helper function to validate date format (basic example, can be more robust)
  const validateDate = (date: string) => {
    // Simple check: not empty and has at least 5 characters (e.g., "Jan 1")
    return date.trim().length > 4;
  };

  // Internal state to manage button disabled status
  const [internalCanAdd, setInternalCanAdd] = useState(false);

  const validateForm = (isSubmissionAttempt = false) => {
    let isValid = true;

    // Only show errors if form has been submitted, or if it's a direct submission attempt
    const shouldShowErrors = formSubmitted || isSubmissionAttempt;

    // Program Name
    if (!newProgram.program.trim()) {
      if (shouldShowErrors) setProgramNameError('Program Name is required.');
      isValid = false;
    } else {
      setProgramNameError('');
    }

    // Category (Program Description input)
    if (!newProgram.category.trim()) {
      if (shouldShowErrors) setCategoryError('Category is required.');
      isValid = false;
    } else {
      setCategoryError('');
    }

    // Instructor
    if (!newProgram.instructor) {
      if (shouldShowErrors) setInstructorError('Instructor is required.');
      isValid = false;
    } else {
      setInstructorError('');
    }

    // Date
    if (!newProgram.date.trim()) {
      if (shouldShowErrors) setDateError('Date is required.');
      isValid = false;
    } else if (!validateDate(newProgram.date)) {
      if (shouldShowErrors) setDateError('Please enter a valid date (e.g., June 15, 2025).');
      isValid = false;
    } else {
      setDateError('');
    }

    // Time
    if (!newProgram.time.trim()) {
      if (shouldShowErrors) setTimeError('Time is required.');
      isValid = false;
    } else {
      setTimeError('');
    }

    // Sessions
    if (!newProgram.sessions.trim()) {
      if (shouldShowErrors) setSessionsError('Number of Sessions is required.');
      isValid = false;
    } else if (!validateSessions(newProgram.sessions)) {
      if (shouldShowErrors) setSessionsError('Sessions must be a positive number.');
      isValid = false;
    } else {
      setSessionsError('');
    }

    // About Program Description (textarea)
    if (!newProgram.description.trim()) {
      if (shouldShowErrors) setDescriptionError('About Program description is required.');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    // Thumbnail
    if (!newProgram.thumbnail) {
      if (shouldShowErrors) setThumbnailError('Program thumbnail is required.');
      isValid = false;
    } else {
      setThumbnailError('');
    }

    setInternalCanAdd(isValid); // Update internal state for button
    return isValid; // Return validity for immediate use in handleSubmit
  };

  // Effect to re-run validation whenever newProgram changes
  // and if the form has already been submitted at least once
  useEffect(() => {
    if (formSubmitted) { // Only validate and show errors if submission has been attempted
      validateForm();
    }
    // Also, update internalCanAdd even if not showing errors,
    // so the button's disabled state is always accurate.
    setInternalCanAdd(
        !!newProgram.program.trim() &&
        !!newProgram.category.trim() &&
        !!newProgram.instructor &&
        !!newProgram.date.trim() &&
        validateDate(newProgram.date) &&
        !!newProgram.time.trim() &&
        !!newProgram.sessions.trim() &&
        validateSessions(newProgram.sessions) &&
        !!newProgram.description.trim() &&
        !!newProgram.thumbnail
    );
  }, [newProgram, formSubmitted]); // Depend on newProgram and formSubmitted

  // Reset formSubmitted state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormSubmitted(false);
      // Also clear all errors when modal opens
      setProgramNameError('');
      setCategoryError('');
      setInstructorError('');
      setDateError('');
      setTimeError('');
      setSessionsError('');
      setDescriptionError('');
      setThumbnailError('');
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handleSubmit = () => {
    setFormSubmitted(true); // Mark form as submitted
    // Run validation again right before submission, forcing error display
    if (validateForm(true)) { // Pass true to force error display for this attempt
      onAdd(); // Call the parent's onAdd function
      // If onAdd closes the modal and resets newProgram, then errors will clear naturally.
      // If not, you might need to manually clear errors here.
    }
  };

  const handleLocalThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onThumbnailChange(url); // Pass URL to parent
      if (formSubmitted) { // Only clear error if form has been submitted
          setThumbnailError('');
      }
    } else {
      onThumbnailChange(''); // Clear thumbnail in parent if no file selected
      if (formSubmitted) { // Only set error if form has been submitted
          setThumbnailError('Program thumbnail is required.');
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 max-w-xs sm:max-w-3xl w-full relative max-h-[90vh] overflow-y-auto">
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold cursor-pointer transition-colors z-10" // Added z-10 to keep close button above content
            onClick={onClose}
            aria-label="Close add program modal"
          >
            ×
          </button>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08228d] text-center mb-6 top-0 bg-white pt-2 pb-4 z-0">Add New Program</h2> 

          {/* First Section: Main Program Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-5 mb-6">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm sm:text-base text-gray-700">Program Name:</label>
              <input
                className={`border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${programNameError ? 'border-red-500' : ''}`}
                placeholder="Enter program name"
                value={newProgram.program}
                onChange={e => {
                  onChange('program', e.target.value);
                  if (formSubmitted) setProgramNameError('');
                }}
                onBlur={() => {
                    if (formSubmitted) validateForm();
                }}
              />
              {programNameError && <p className="text-red-500 text-xs mt-1">{programNameError}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm sm:text-base text-gray-700">Time:</label>
              <input
                className={`border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${timeError ? 'border-red-500' : ''}`}
                placeholder="e.g., 9:00 AM - 11:00 AM"
                value={newProgram.time}
                onChange={e => {
                  onChange('time', e.target.value);
                  if (formSubmitted) setTimeError('');
                }}
                onBlur={() => {
                    if (formSubmitted) validateForm();
                }}
              />
              {timeError && <p className="text-red-500 text-xs mt-1">{timeError}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm sm:text-base text-gray-700">Category:</label>
              <input
                className={`border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${categoryError ? 'border-red-500' : ''}`}
                placeholder="e.g., Fitness, Yoga, Martial Arts"
                value={newProgram.category}
                onChange={e => {
                  onChange('category', e.target.value);
                  if (formSubmitted) setCategoryError('');
                }}
                onBlur={() => {
                    if (formSubmitted) validateForm();
                }}
              />
              {categoryError && <p className="text-red-500 text-xs mt-1">{categoryError}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm sm:text-base text-gray-700">No. of Sessions:</label>
              <input
                type="number"
                className={`border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${sessionsError ? 'border-red-500' : ''}`}
                placeholder="Enter number of sessions"
                value={newProgram.sessions}
                onChange={e => {
                  onChange('sessions', e.target.value);
                  if (formSubmitted) setSessionsError('');
                }}
                onBlur={() => {
                    if (formSubmitted) validateForm();
                }}
              />
              {sessionsError && <p className="text-red-500 text-xs mt-1">{sessionsError}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm sm:text-base text-gray-700">Instructor Assigned:</label>
              <select
                className={`border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 cursor-pointer ${instructorError ? 'border-red-500' : ''}`}
                value={newProgram.instructor}
                onChange={e => {
                  onChange('instructor', e.target.value);
                  if (formSubmitted) setInstructorError('');
                }}
                onBlur={() => {
                    if (formSubmitted) validateForm();
                }}
              >
                <option value="">Assign Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst.email} value={inst.name}>{inst.name}</option>
                ))}
              </select>
              {instructorError && <p className="text-red-500 text-xs mt-1">{instructorError}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm sm:text-base text-gray-700">Date:</label>
              <input
                type="text"
                className={`border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${dateError ? 'border-red-500' : ''}`}
                placeholder="e.g., June 15, 2025"
                value={newProgram.date}
                onChange={e => {
                  onChange('date', e.target.value);
                  if (formSubmitted) setDateError('');
                }}
                onBlur={() => {
                    if (formSubmitted) validateForm();
                }}
              />
              {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
            </div>
          </div>

          {/* About Program Section */}
          <div className="mb-6">
            <label className="font-semibold text-sm sm:text-base block mb-2 text-gray-700">About Program:</label>
            <textarea
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 min-h-[100px] sm:min-h-[140px] text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200 ${descriptionError ? 'border-red-500' : ''}`}
              placeholder="Provide a detailed description of the program"
              value={newProgram.description}
              onChange={e => {
                onChange('description', e.target.value);
                if (formSubmitted) setDescriptionError('');
              }}
              onBlur={() => {
                  if (formSubmitted) validateForm();
              }}
            />
            {descriptionError && <p className="text-red-500 text-xs mt-1">{descriptionError}</p>}
          </div>

          {/* Program Curriculum Section */}
          <div className="mb-6">
            <label className="font-semibold text-sm sm:text-base block mb-2 text-gray-700">Program Curriculum (Optional):</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 min-h-[100px] sm:min-h-[140px] text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08228d] transition-all duration-200"
              placeholder="Outline the program curriculum"
              value={newProgram.curriculum || ''}
              onChange={e => onChange('curriculum', e.target.value)}
            />
          </div>

          {/* Program Thumbnail Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm sm:text-base text-gray-700">Program Thumbnail:</label>
              {newProgram.thumbnail && (
                <Image
                  src={newProgram.thumbnail}
                  alt="Thumbnail Preview"
                  width={192}
                  height={128}
                  className="mt-2 w-48 h-32 object-cover rounded-lg border border-gray-300 bg-gray-200 shadow-sm"
                />
              )}
              {thumbnailError && formSubmitted && <p className="text-red-500 text-xs mt-1">{thumbnailError}</p>}
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <label
                htmlFor="thumbnail-upload"
                className={`cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full flex items-center text-sm sm:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${thumbnailError && formSubmitted ? 'border-2 border-red-500' : ''}`}
              >
                Upload Thumbnail
              </label>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                ref={thumbnailInputRef}
                className="hidden"
                onChange={handleLocalThumbnailChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6 pb-4"> {/* Added pb-4 for spacing */}
            <button
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!internalCanAdd}
            >
              Submit Program
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
      {/* Custom scrollbar styles (optional, but recommended for better appearance) */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
};

export default AddProgramModal;