'use client';

import { useSearchParams } from 'next/navigation';
import { programsList } from '@/data/programsData';
import Navbar from '@/components/ui/Navbar';
import React, { useState, useEffect } from 'react';
import EnrollModal from '@/components/LoginComponents/enroll';
import { getRole, UserRole } from '@/components/roles/role';
import { dummyStudents, programPrices } from '@/data/data';

const ProgramView = () => {
  const searchParams = useSearchParams();
  const programName = searchParams?.get('program');
  const programData = programsList.find((p) => p.program === programName);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollmentPending, setEnrollmentPending] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [role, setRole] = useState<UserRole | undefined>(undefined);
  const price = programData ? programPrices[programData.program] || 0 : 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('role');
      if (storedRole) setRole(storedRole as UserRole);
    }
  }, []);

  if (!programData) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Program not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Program Card */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#002B5C]">{programData.program}</h1>
            <p className="text-gray-600 mt-2 mb-4 italic">{programData.category}</p>

            <p className="mb-4">
              <span className="font-semibold">Description:</span>{' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <p className="mb-2">
              <span className="font-semibold">Time:</span> 9:00 AM – 12:00 PM
            </p>
            <p className="mb-2">
              <span className="font-semibold">No. of Sessions:</span> 6
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span> June 15, 2025
            </p>
            <p className="mb-2">
              <span className="font-semibold">Instructor:</span> John Doe
            </p>
          </div>

          {/* Right Thumbnail */}
          <div className="w-full md:w-48 h-48 bg-gray-300 rounded-md flex items-center justify-center text-gray-500">
            Thumbnail
          </div>
        </div>
      </div>

      {/* About This Program Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 mt-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-[#002B5C] mb-4">About This Program</h2>
        <p className="text-gray-700">
          This program is designed to provide learners with essential skills and knowledge in
          their chosen area. You’ll engage in hands-on sessions, lectures, and group activities to
          maximize learning outcomes.
        </p>
      </div>

      {/* Program Curriculum Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 mt-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-[#002B5C] mb-4">Program Curriculum</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Session 1: Introduction to the Program</li>
          <li>Session 2: Core Concepts and Tools</li>
          <li>Session 3: Hands-on Application</li>
          <li>Session 4: Advanced Techniques</li>
          <li>Session 5: Group Work and Projects</li>
          <li>Session 6: Final Presentation and Feedback</li>
        </ul>
      </div>

      {/* Action Button */}
      <div className="max-w-4xl mx-auto p-8 mt-6 mb-12 text-center">
        {role === 'teacher' ? (
          <button
            className="bg-[#002B5C] text-white font-bold py-3 px-6 rounded-full hover:bg-[#001f40] transition duration-300"
            onClick={() => setShowStudents(true)}
          >
            Show List of Students
          </button>
        ) : role === 'student' ? (
          <button
            className={
              enrollmentPending
                ? 'bg-yellow-400 text-white font-bold py-3 px-6 rounded-full cursor-not-allowed transition duration-300'
                : 'bg-[#002B5C] text-white font-bold py-3 px-6 rounded-full hover:bg-[#001f40] transition duration-300'
            }
            onClick={() => {
              if (!enrollmentPending) setIsEnrollOpen(true);
            }}
            disabled={enrollmentPending}
          >
            {enrollmentPending ? 'Wait for Confirmation' : 'Enroll Now'}
          </button>
        ) : null}
      </div>
      {/* Enroll Modal for students */}
      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        program={programData.program}
        price={price}
        onEnrollmentSubmitted={() => {
          setEnrollmentPending(true);
          setIsEnrollOpen(false);
        }}
      />
      {/* Student List Modal for teachers */}
      {showStudents && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#002B5C]">Enrolled Students</h3>
            <ul className="mb-4">
              {dummyStudents.map((student, idx) => (
                <li key={idx} className="mb-2">
                  <span className="font-semibold">{student.name}</span>
                  <span className="text-gray-500 ml-2 text-sm">{student.email}</span>
                </li>
              ))}
            </ul>
            <button
              className="bg-[#92D0D3] text-white px-4 py-2 rounded hover:bg-[#6bb7bb] transition"
              onClick={() => setShowStudents(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramView;
