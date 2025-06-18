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

  // >>>>>>>>>>>>>> IMPORTANT: validateForm function moved BEFORE useEffect <<<<<<<<<<<<<<
  const validateForm = () => {
    let isValid = true;

    // Program Name
    if (!newProgram.program.trim()) {
      setProgramNameError('Program Name is required.');
      isValid = false;
    } else {
      setProgramNameError('');
    }

    // Category (Program Description input)
    if (!newProgram.category.trim()) {
      setCategoryError('Category is required.'); // Changed message for clarity based on placeholder
      isValid = false;
    } else {
      setCategoryError('');
    }

    // Instructor
    if (!newProgram.instructor) {
      setInstructorError('Instructor is required.');
      isValid = false;
    } else {
      setInstructorError('');
    }

    // Date
    if (!newProgram.date.trim()) {
      setDateError('Date Start is required.');
      isValid = false;
    } else if (!validateDate(newProgram.date)) {
      setDateError('Please enter a valid date (e.g., June 15, 2025).');
      isValid = false;
    } else {
      setDateError('');
    }

    // Time
    if (!newProgram.time.trim()) {
      setTimeError('Time is required.');
      isValid = false;
    } else {
      setTimeError('');
    }

    // Sessions
    if (!newProgram.sessions.trim()) {
      setSessionsError('Number of Sessions is required.');
      isValid = false;
    } else if (!validateSessions(newProgram.sessions)) {
      setSessionsError('Sessions must be a positive number.');
      isValid = false;
    } else {
      setSessionsError('');
    }

    // About Program Description (textarea)
    if (!newProgram.description.trim()) {
      setDescriptionError('About Program description is required.');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    // Thumbnail
    if (!newProgram.thumbnail) {
      setThumbnailError('Program thumbnail is required.');
      isValid = false;
    } else {
      setThumbnailError('');
    }

    setInternalCanAdd(isValid); // Update internal state for button
    return isValid; // Return validity for immediate use in handleSubmit
  };

  // Effect to re-run validation whenever newProgram changes
  // Now validateForm is defined when this effect runs
  useEffect(() => {
    validateForm();
  }, [newProgram]); // Depend on newProgram

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Run validation again right before submission
    if (validateForm()) {
      onAdd(); // Call the parent's onAdd function
      // Optionally, reset local errors here if the modal doesn't close immediately
      // or if onAdd handles the reset of newProgram state in parent
    }
  };

  const handleLocalThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onThumbnailChange(url); // Pass URL to parent
      setThumbnailError(''); // Clear error on successful file selection
    } else {
      onThumbnailChange(''); // Clear thumbnail in parent if no file selected
      setThumbnailError('Program thumbnail is required.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-[#f3f3f3] rounded-2xl shadow-xl p-4 sm:p-8 max-w-xs sm:max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-black hover:text-gray-700 text-2xl sm:text-3xl font-bold"
          onClick={onClose}
          aria-label="Close add program modal"
        >
          ×
        </button>
        {/* First Section: Main Program Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-4 sm:mb-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Program Name:</label>
            <input
              className={`border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base ${programNameError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
              placeholder="Program Name"
              value={newProgram.program}
              onChange={e => {
                onChange('program', e.target.value);
                setProgramNameError(''); // Clear error on change
              }}
            />
            {programNameError && <p className="text-red-500 text-xs mt-1">{programNameError}</p>}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Time:</label>
            <input
              className={`border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base ${timeError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
              placeholder="Time (e.g., 9:00 AM - 11:00 AM)"
              value={newProgram.time}
              onChange={e => {
                onChange('time', e.target.value);
                setTimeError(''); // Clear error on change
              }}
            />
            {timeError && <p className="text-red-500 text-xs mt-1">{timeError}</p>}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Category:</label>
            <input
              className={`border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base ${categoryError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
              placeholder="Category (e.g., Fitness, Yoga, Martial Arts)"
              value={newProgram.category}
              onChange={e => {
                onChange('category', e.target.value);
                setCategoryError(''); // Clear error on change
              }}
            />
            {categoryError && <p className="text-red-500 text-xs mt-1">{categoryError}</p>}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">No. of Sessions:</label>
            <input
              type="number" // Set type to number for better input control
              className={`border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base ${sessionsError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
              placeholder="No. of Sessions"
              value={newProgram.sessions}
              onChange={e => {
                onChange('sessions', e.target.value);
                setSessionsError(''); // Clear error on change
              }}
            />
            {sessionsError && <p className="text-red-500 text-xs mt-1">{sessionsError}</p>}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Instructor Assigned:</label>
            <select
              className={`border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base ${instructorError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
              value={newProgram.instructor}
              onChange={e => {
                onChange('instructor', e.target.value);
                setInstructorError(''); // Clear error on change
              }}
            >
              <option value="">Assign Instructor</option>
              {instructors.map((inst) => (
                <option key={inst.email} value={inst.name}>{inst.name}</option>
              ))}
            </select>
            {instructorError && <p className="text-red-500 text-xs mt-1">{instructorError}</p>}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Date Start:</label>
            <input
              type="text" // Can be type="date" if you want a date picker
              className={`border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base ${dateError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
              placeholder="Date (e.g. June 15, 2025)"
              value={newProgram.date}
              onChange={e => {
                onChange('date', e.target.value);
                setDateError(''); // Clear error on change
              }}
            />
            {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
          </div>
        </div>
        {/* About Program Section */}
        <div className="mb-4 sm:mb-6">
          <label className="font-normal text-sm sm:text-base block mb-1 sm:mb-2 text-black">About Program:</label>
          <textarea
            className={`w-full border rounded px-3 py-2 bg-gray-400 min-h-[80px] sm:min-h-[120px] text-black text-xs sm:text-base ${descriptionError ? 'border-red-500' : 'focus:ring-2 focus:ring-[#08228d]'}`}
            placeholder="About Program (detailed description)"
            value={newProgram.description}
            onChange={e => {
              onChange('description', e.target.value);
              setDescriptionError(''); // Clear error on change
            }}
          />
          {descriptionError && <p className="text-red-500 text-xs mt-1">{descriptionError}</p>}
        </div>
        {/* Program Curriculum Section */}
        <div className="mb-4 sm:mb-6">
          <label className="font-normal text-sm sm:text-base block mb-1 sm:mb-2 text-black">Program Curriculum:</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-gray-400 min-h-[80px] sm:min-h-[120px] text-black text-xs sm:text-base focus:ring-2 focus:ring-[#08228d]"
            placeholder="Program Curriculum (optional)"
            value={newProgram.curriculum || ''}
            onChange={e => onChange('curriculum', e.target.value)}
          />
          {/* No error message for curriculum as it's optional */}
        </div>
        {/* Program Thumbnail Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Program Thumbnail:</label>
            {newProgram.thumbnail && (
              <Image src={newProgram.thumbnail} alt="Preview" width={192} height={128} className="mt-2 w-32 h-20 sm:w-48 sm:h-32 object-cover rounded bg-gray-400" />
            )}
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <label
              htmlFor="thumbnail-upload"
              className={`cursor-pointer bg-blue-400 hover:bg-blue-500 text-black px-3 py-1 rounded flex items-center text-sm sm:text-base font-semibold ${thumbnailError ? 'border border-red-500' : ''}`}
            >
              Upload Program Thumbnail
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              className="hidden"
              onChange={handleLocalThumbnailChange} // Use local handler
            />
          </div>
        </div>
        {thumbnailError && <p className="text-red-500 text-xs mt-1">{thumbnailError}</p>}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-sky-500 text-white px-4 sm:px-6 py-2 rounded-full font-bold hover:bg-sky-600 flex items-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!internalCanAdd} // Use internal validation state
          >
            Submit
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProgramModal;