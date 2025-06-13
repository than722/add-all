// app/components/Programs/ProgramActionsClient.tsx
// This component handles role-specific actions (buttons/status) for a program.

'use client'; // This component must be a client component because it uses hooks.

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { programsList } from '@/data/programsData';
import EnrollModal from '@/components/ui/Modals/enrollmentModal';
import { dummyStudents, programPrices } from '@/data/data';
import { useAuth } from '@/components/contexts/authContext'; // Directly import useAuth here

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
}

interface ProgramActionsClientProps {
  programName: string; // Program name passed from the parent page
  // The 'role' prop is no longer needed here, as it's fetched directly via useAuth()
}

const ProgramActionsClient: React.FC<ProgramActionsClientProps> = ({ programName }) => {
  const decodedProgramName = decodeURIComponent(programName);
  const programData = programsList.find((p) => p.program === decodedProgramName);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>([]);
  const price = programData ? programPrices[programData.program] || 0 : 0;

  const { role } = useAuth(); // Get the role directly within this client component

  // Simulate current student info for enrollment logic
  const currentStudent = { name: 'Juan Dela Cruz', email: 'student@example.com' };

  useEffect(() => {
    // Load pending applications from localStorage for demo
    if (typeof window !== 'undefined') {
      const storedPending = localStorage.getItem(`pendingApps_${decodedProgramName}`);
      if (storedPending) {
        setPendingApps(JSON.parse(storedPending));
      }
    }
  }, [decodedProgramName]);

  // Save pending applications to localStorage for demo persistence
  useEffect(() => {
    if (typeof window !== 'undefined' && decodedProgramName) {
      localStorage.setItem(`pendingApps_${decodedProgramName}`, JSON.stringify(pendingApps));
    }
  }, [pendingApps, decodedProgramName]);

  // Handle enrollment submission from modal
  const handleEnrollmentSubmitted = (receiptFile: File, paymentType: string) => {
    const receiptUrl = URL.createObjectURL(receiptFile);
    setPendingApps((prev) => [
      ...prev,
      {
        name: currentStudent.name,
        email: currentStudent.email,
        receiptUrl,
        paymentType,
        status: 'pending',
      },
    ]);
    setIsEnrollOpen(false); // Close modal
  };

  if (!programData) {
    // This case should ideally be handled by the parent component or ProgramDetailsBase
    return null;
  }

  // For student: check if they have a pending or enrolled application
  const studentPendingApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'pending'
  );
  const studentEnrolledApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'enrolled'
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 mt-4 sm:mt-6 mb-8 sm:mb-12 text-center">
      {role === 'teacher' ? (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href={`/teacher/assignedprograms/${encodeURIComponent(programData.program)}/enrolledstudents`}
            className="inline-block bg-[#92D0D3] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#6bb7b9] transition text-sm sm:text-base"
          >
            List of Students
          </Link>
          <Link
            href={`/teacher/assignedprograms/${encodeURIComponent(programData.program)}/editprogram`}
            className="inline-block bg-[#08228d] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#001f40] transition text-sm sm:text-base"
          >
            Edit Course Outline
          </Link>
        </div>
      ) : role === 'student' ? (
        studentPendingApp ? (
          <span className="inline-block bg-yellow-400 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full cursor-not-allowed text-sm sm:text-base">
            Pending Application
          </span>
        ) : studentEnrolledApp ? (
          <span className="inline-block bg-green-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base">
            Enrolled
          </span>
        ) : (
          <button
            className="bg-[#08228d] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#001f40] transition duration-300 text-sm sm:text-base"
            onClick={() => setIsEnrollOpen(true)}
          >
            Enroll Now
          </button>
        )
      ) : null /* Or a "Login to Enroll" button for unauthenticated users */
      }

      {/* Enroll Modal for students */}
      {role === 'student' && programData && (
        <EnrollModal
          isOpen={isEnrollOpen}
          onClose={() => setIsEnrollOpen(false)}
          program={programData.program}
          price={price}
          onEnrollmentSubmitted={handleEnrollmentSubmitted}
        />
      )}
    </div>
  );
};

export default ProgramActionsClient;
