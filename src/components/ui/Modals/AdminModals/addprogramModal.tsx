import React from "react";
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
  canAdd: boolean;
}

const AddProgramModal: React.FC<AddProgramModalProps> = ({
  isOpen,
  newProgram,
  instructors,
  onChange,
  onThumbnailChange,
  onClose,
  onAdd,
  canAdd,
}) => {
  if (!isOpen) return null;
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
              className="border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base"
              placeholder="Program Name"
              value={newProgram.program}
              onChange={e => onChange('program', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Time:</label>
            <input
              className="border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base"
              placeholder="Time"
              value={newProgram.time}
              onChange={e => onChange('time', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Program Description:</label>
            <input
              className="border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base"
              placeholder="Program Description"
              value={newProgram.category}
              onChange={e => onChange('category', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">No. of Sessions:</label>
            <input
              className="border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base"
              placeholder="No. of Sessions"
              value={newProgram.sessions}
              onChange={e => onChange('sessions', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Instructor Assigned:</label>
            <select
              className="border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base"
              value={newProgram.instructor}
              onChange={e => onChange('instructor', e.target.value)}
            >
              <option value="">Assign Instructor</option>
              {instructors.map((inst) => (
                <option key={inst.email} value={inst.name}>{inst.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Date Start:</label>
            <input
              className="border rounded px-3 py-2 bg-gray-300 text-black text-xs sm:text-base"
              placeholder="Date (e.g. June 15, 2025)"
              value={newProgram.date}
              onChange={e => onChange('date', e.target.value)}
            />
          </div>
        </div>
        {/* About Program Section */}
        <div className="mb-4 sm:mb-6">
          <label className="font-normal text-sm sm:text-base block mb-1 sm:mb-2 text-black">About Program:</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-gray-400 min-h-[80px] sm:min-h-[120px] text-black text-xs sm:text-base"
            placeholder="About Program"
            value={newProgram.description}
            onChange={e => onChange('description', e.target.value)}
          />
        </div>
        {/* Program Curriculum Section */}
        <div className="mb-4 sm:mb-6">
          <label className="font-normal text-sm sm:text-base block mb-1 sm:mb-2 text-black">Program Curriculum:</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-gray-400 min-h-[80px] sm:min-h-[120px] text-black text-xs sm:text-base"
            placeholder="Program Curriculum"
            value={newProgram.curriculum || ''}
            onChange={e => onChange('curriculum', e.target.value)}
          />
        </div>
        {/* Program Thumbnail Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="font-normal text-sm sm:text-base text-black">Program Thumbnail:</label>
            {newProgram.thumbnail && (
              <img src={newProgram.thumbnail} alt="Preview" className="mt-2 w-32 h-20 sm:w-48 sm:h-32 object-cover rounded bg-gray-400" />
            )}
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <label htmlFor="thumbnail-upload" className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-black px-3 py-1 rounded flex items-center text-sm sm:text-base font-semibold">
              Upload Program Thumbnail
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  onThumbnailChange(url);
                }
              }}
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-sky-500 text-white px-4 sm:px-6 py-2 rounded-full font-bold hover:bg-sky-600 flex items-center gap-2 text-sm sm:text-base"
            onClick={onAdd}
            disabled={!canAdd}
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
