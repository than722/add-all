'use client'; // This can be a client component if it needs access to client-side data or interactions.

import React from 'react';
import { programsList } from '@/data/programsData';
import { dummyDetails } from '@/data/data'; // Assuming dummyDetails contains static program info

interface ProgramDetailsBaseProps {
  programName: string; // The program name to display details for
}

const ProgramDetailsBase: React.FC<ProgramDetailsBaseProps> = ({ programName }) => {
  const decodedProgramName = decodeURIComponent(programName);
  const programData = programsList.find((p) => p.program === decodedProgramName);

  // Using dummyDetails for static program information like description, time, date, sessions
  // In a real app, this would come from a specific API call for this program.
  const programDescription = dummyDetails.description;
  const [programTime, programSessionsText] = dummyDetails.timeAndSessions.split(' | ');
  const programSessions = programSessionsText ? programSessionsText.replace(' Sessions', '') : 'N/A';
  const programDate = dummyDetails.date;
  const programInstructorName = dummyDetails.instructor;

  if (!programData) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Program not found.
      </div>
    );
  }

  return (
    <>
      {/* Program Card */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-lg mt-4 sm:mt-6">
        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
          {/* Left Details */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-[#08228d]">{programData.program}</h1>
            <p className="text-gray-600 mt-2 mb-4 italic text-sm sm:text-base">{programData.category}</p>

            <p className="mb-4 text-sm sm:text-base">
              <span className="font-semibold text-black">Description:</span>{' '}
              <span className="text-black">{programDescription}</span>
            </p>

            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">Time:</span> <span className="text-black">{programTime}</span>
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">No. of Sessions:</span> <span className="text-black">{programSessions}</span>
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">Date:</span> <span className="text-black">{programDate}</span>
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold text-black">Instructor:</span> <span className="text-black">{programInstructorName}</span>
            </p>
          </div>

          {/* Right Thumbnail */}
          <div className="w-full md:w-48 h-40 md:h-48 bg-gray-300 rounded-md flex items-center justify-center text-gray-500 mt-4 md:mt-0">
            Thumbnail
          </div>
        </div>
      </div>

      {/* About This Program Section */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 mt-4 sm:mt-6 rounded-xl shadow">
        <h2 className="text-lg sm:text-xl font-bold text-[#08228d] mb-3 sm:mb-4">About This Program</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          This program is designed to provide learners with essential skills and knowledge in
          their chosen area. You’ll engage in hands-on sessions, lectures, and group activities to
          maximize learning outcomes.
        </p>
      </div>

      {/* Program Curriculum Section */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 mt-4 sm:mt-6 rounded-xl shadow">
        <h2 className="text-lg sm:text-xl font-bold text-[#08228d] mb-3 sm:mb-4">Program Curriculum</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
          <li>Session 1: Introduction to the Program</li>
          <li>Session 2: Core Concepts and Tools</li>
          <li>Session 3: Hands-on Application</li>
          <li>Session 4: Advanced Techniques</li>
          <li>Session 5: Group Work and Projects</li>
          <li>Session 6: Final Presentation and Feedback</li>
        </ul>
      </div>
    </>
  );
};

export default ProgramDetailsBase;