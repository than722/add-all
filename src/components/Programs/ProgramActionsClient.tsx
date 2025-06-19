'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { programsList } from '@/data/programsData';
import EnrollModal from '@/components/ui/Modals/EnrollmentModal/enrollmentModal';
import { dummyStudents, programPrices } from '@/data/data';
import { useAuth } from '@/components/contexts/authContext';

interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
}

interface ProgramActionsClientProps {
  programName: string;
}

const ProgramActionsClient: React.FC<ProgramActionsClientProps> = ({ programName }) => {
  const decodedProgramName = decodeURIComponent(programName);
  const programData = programsList.find((p) => p.program === decodedProgramName);

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>([]);
  const price = programData ? programPrices[programData.program] || 0 : 0;

  const { role } = useAuth();

  const currentStudent = { name: 'Juan Dela Cruz', email: 'student@example.com' };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPending = localStorage.getItem(`pendingApps_${decodedProgramName}`);
      if (storedPending) {
        setPendingApps(JSON.parse(storedPending));
      }
    }
  }, [decodedProgramName]);

  useEffect(() => {
    if (typeof window !== 'undefined' && decodedProgramName) {
      localStorage.setItem(`pendingApps_${decodedProgramName}`, JSON.stringify(pendingApps));
    }
  }, [pendingApps, decodedProgramName]);

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
    setIsEnrollOpen(false);
  };

  if (!programData) {
    return null;
  }

  const studentPendingApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'pending'
  );
  const studentEnrolledApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'enrolled'
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 mt-4 sm:mt-6 mb-8 sm:mb-12 text-center">
      {role === 'instructor' ? (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href={`/instructor/assignedprograms/${encodeURIComponent(programData.program)}/enrolledstudents`}
            className="inline-block bg-[#92D0D3] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#6bb7b9] transition text-sm sm:text-base cursor-pointer"
          >
            List of Students
          </Link>
          <Link
            href={`/instructor/assignedprograms/${encodeURIComponent(programData.program)}/editprogram`}
            className="inline-block bg-[#08228d] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#001f40] transition text-sm sm:text-base cursor-pointer"
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
            className="bg-[#08228d] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#001f40] transition duration-300 text-sm sm:text-base cursor-pointer"
            onClick={() => setIsEnrollOpen(true)}
          >
            Enroll Now
          </button>
        )
      ) : null
      }

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