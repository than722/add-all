'use client';

import React, { useState, useEffect } from 'react';
import AddProgramModal from '@/components/ui/Modals/AdminModals/addprogramModal';
import EnrollModal from '@/components/ui/Modals/EnrollmentModal/enrollmentModal';
import { programsList } from '@/data/programsData';
import { instructors, programPrices } from '@/data/data';
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
  const programData = programsList.find(
    (p) => p.program.toLowerCase() === decodedProgramName.toLowerCase()
  );

  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>([]);
  const price = programData ? programPrices[programData.program] || 0 : 0;
  const { role } = useAuth();

  const currentStudent = { name: 'Juan Dela Cruz', email: 'student@example.com' };

  const [programForm, setProgramForm] = useState(() => ({
    program: programData?.program || '',
    category: programData?.category || '',
    instructor: programData?.instructor || '',
    date: programData?.date || '',
    time: programData?.time || '',
    sessions: programData?.sessions || '',
    description: programData?.description || '',
    curriculum: Array.isArray(programData?.curriculum) ? programData.curriculum : [],
    thumbnail: programData?.thumbnail || '',
  }));

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

  const handleFieldChange = (field: string, value: string) => {
    setProgramForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (url: string) => {
    setProgramForm((prev) => ({ ...prev, thumbnail: url }));
  };

  const handleSave = () => {
    console.log('Saved Program:', programForm);
    setIsEditModalOpen(false);
  };

  if (!programData) return null;

  const studentPendingApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'pending'
  );
  const studentEnrolledApp = pendingApps.find(
    (app) => app.email === currentStudent.email && app.status === 'enrolled'
  );

  const isAdminLike = role === 'admin' || role === 'superadmin';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 mt-4 sm:mt-6 mb-8 sm:mb-12 text-center">
      {isAdminLike && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            className="bg-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer"
            onClick={() => window.location.href = `/${role}/programlist/${encodeURIComponent(programData.program)}/view-outline`}
          >
            View Outline
          </button>
          <button
            className="bg-green-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-green-700 transition text-sm sm:text-base cursor-pointer"
            onClick={() => window.location.href = `/${role}/programlist/${encodeURIComponent(programData.program)}/edit-outline`}
          >
            Edit Outline
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-yellow-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-yellow-700 transition text-sm sm:text-base cursor-pointer"
          >
            Edit Program
          </button>
        </div>
      )}

      {role === 'instructor' && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            className="bg-[#92D0D3] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#6bb7b9] transition text-sm sm:text-base cursor-pointer"
            onClick={() => window.location.href = `/instructor/assignedprograms/${encodeURIComponent(programData.program)}/enrolledstudents`}
          >
            List of Students
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer"
            onClick={() => window.location.href = `/instructor/assignedprograms/${encodeURIComponent(programData.program)}/viewoutline`}
          >
            View Outline
          </button>
          <button
            className="bg-[#08228d] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-[#001f40] transition text-sm sm:text-base cursor-pointer"
            onClick={() => window.location.href = `/instructor/assignedprograms/${encodeURIComponent(programData.program)}/editprogram`}
          >
            Edit Course Outline
          </button>
        </div>
      )}

      {role === 'student' &&
        (studentPendingApp ? (
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
        ))}

      {role === 'student' && programData && (
        <EnrollModal
          isOpen={isEnrollOpen}
          onClose={() => setIsEnrollOpen(false)}
          program={programData.program}
          price={price}
          onEnrollmentSubmitted={handleEnrollmentSubmitted}
        />
      )}

      {isAdminLike && (
        <AddProgramModal
          isOpen={isEditModalOpen}
          mode="edit"
          newProgram={programForm}
          instructors={instructors}
          onChange={handleFieldChange}
          onThumbnailChange={handleThumbnailChange}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProgramActionsClient;
