import React from 'react';

interface FeaturedProgramViewModalProps {
  program: string;
  category: string;
  onClose: () => void;
}

const programDetails: Record<string, {
  instructor: string;
  time: string;
  sessions: number;
  date: string;
  price: string;
}> = {
  'Floristry': { instructor: 'John Doe', time: '9:00 AM – 12:00 PM', sessions: 6, date: 'June 15, 2025', price: '₱2,500' },
  'Basic Soap Making': { instructor: 'Jane Smith', time: '1:00 PM – 4:00 PM', sessions: 4, date: 'July 1, 2025', price: '₱1,800' },
};

const defaultDetails = { instructor: 'John Doe', time: '9:00 AM – 12:00 PM', sessions: 6, date: 'June 15, 2025', price: '₱2,500' };

const FeaturedProgramViewModal: React.FC<FeaturedProgramViewModalProps> = ({ program, category, onClose }) => {
  const details = programDetails[program] || defaultDetails;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white p-0 sm:p-0 rounded-2xl shadow-2xl w-full max-w-4xl min-h-[400px] flex flex-col md:flex-row overflow-hidden relative animate-fade-in">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
          onClick={onClose}
          aria-label="Close program modal"
        >
          ✕
        </button>
        {/* Left: Thumbnail and Basic Info */}
        <div className="w-full md:w-2/5 bg-[#f1f5f9] flex flex-col items-center justify-center p-6">
          <div className="rounded-xl mb-4 w-28 h-28 bg-gray-300 flex items-center justify-center text-gray-500 text-2xl select-none shadow">
            <span>📷</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#08228d] mb-1 text-center">{program}</h2>
          <p className="text-xs font-semibold text-[#92D0D3] text-center mb-2 uppercase tracking-widest">{category}</p>
          <div className="flex flex-col gap-1 mt-2 w-full">
            <div className="flex items-center gap-2 text-xs text-gray-700"><span className="font-bold">Instructor:</span> {details.instructor}</div>
            <div className="flex items-center gap-2 text-xs text-gray-700"><span className="font-bold">Time:</span> {details.time}</div>
            <div className="flex items-center gap-2 text-xs text-gray-700"><span className="font-bold">Sessions:</span> {details.sessions}</div>
            <div className="flex items-center gap-2 text-xs text-gray-700"><span className="font-bold">Date:</span> {details.date}</div>
            <div className="flex items-center gap-2 text-xs text-gray-700"><span className="font-bold">Price/Slot:</span> {details.price}</div>
          </div>
        </div>
        {/* Right: Description and Curriculum */}
        <div className="w-full md:w-3/5 p-6 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-[#08228d] mb-2">Description</h3>
          <p className="text-gray-700 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula.</p>
          <h3 className="text-lg font-bold text-[#08228d] mb-2">Sample Curriculum</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-2">
            <li>Session 1: Introduction to the Program</li>
            <li>Session 2: Core Concepts and Tools</li>
            <li>Session 3: Hands-on Application</li>
            <li>Session 4: Advanced Techniques</li>
            <li>Session 5: Group Work and Projects</li>
            <li>Session 6: Final Presentation and Feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProgramViewModal;
