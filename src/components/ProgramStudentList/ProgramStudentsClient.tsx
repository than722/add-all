'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import AllowPaymentModal from '@/components/ui/Modals/AdminModals/AllowPaymentModal';
import StudentListSection from '@/components/StudentListSection/StudentListSection';
import { students as initialStudents, dummyPendingApps, demoStudentListData, PendingApplication, StudentRecord } from '@/data/data';
import { getFeedbackForProgram } from '@/data/StudentFeedbackData';

interface RegisteredStudentsSectionProps {
  programName: string;
  role: 'admin' | 'superadmin';
}

export default function RegisteredStudentsSection({
  programName,
  role,
}: RegisteredStudentsSectionProps) {
  const router = useRouter(); // Initialize useRouter

  const allStudentRecords: StudentRecord[] = useMemo(() => {
    const studentProfilesMap = new Map<string, typeof initialStudents[0]>();
    initialStudents.forEach(s => studentProfilesMap.set(s.email, s));

    const consolidatedApplications = new Map<string, PendingApplication>();
    dummyPendingApps.forEach(app => {
      consolidatedApplications.set(`${app.email}_${app.program}`, app);
    });
    Object.values(demoStudentListData).flat().forEach(app => {
      const key = `${app.email}_${app.program}`;
      if (
        !consolidatedApplications.has(key) ||
        (consolidatedApplications.get(key)?.status === 'pending' && app.status === 'enrolled')
      ) {
        consolidatedApplications.set(key, app);
      }
    });

    const records: StudentRecord[] = [];
    consolidatedApplications.forEach(app => {
      if (app.program === programName) {
        const studentProfile = studentProfilesMap.get(app.email);
        records.push({
          name: studentProfile?.name || app.name,
          email: app.email,
          img: studentProfile?.img || '/profileicon.png',
          bio: studentProfile?.bio || '',
          contact: studentProfile?.contact || '',
          status: app.status,
          program: app.program,
          receiptUrl: app.receiptUrl,
          paymentType: app.paymentType,
        });
      }
    });
    return records;
  }, [programName]);

  const [profileModal, setProfileModal] = useState<any>(null);
  const [allowPaymentModal, setAllowPaymentModal] = useState(false);
  const [studentStatuses, setStudentStatuses] = useState<Record<string, 'registered' | 'pendingPayment'>>({});
  const [archivedStudents, setArchivedStudents] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<any>(null);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'feedback'>('students');

  const programStudentFeedback = useMemo(() => getFeedbackForProgram(programName), [programName]);

  const handleAllowPayment = () => {
    setAllowPaymentModal(true);
  };

  const handleValidatePayment = () => {
    setStudentStatuses((prev) => {
      const updated: Record<string, 'registered' | 'pendingPayment'> = { ...prev };
      allStudentRecords.forEach(student => {
        updated[student.email] = 'pendingPayment';
      });
      return updated;
    });
    setAllowPaymentModal(false);
  };

  const renderStars = (rating: number) => (
    <div className="flex text-lg">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Use router.back() for navigation
        className="inline-block mb-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 shadow text-sm cursor-pointer"
      >
        ← Back to {programName}
      </button>

      <h1 className="text-2xl font-bold mb-6 text-[#08228d]">Student List for {programName} ({role})</h1>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-4 text-sm font-semibold cursor-pointer ${
            activeTab === 'students' ? 'text-[#08228d] border-b-2 border-[#08228d]' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('students')}
        >
          Student List
        </button>
        <button
          className={`py-3 px-4 text-sm font-semibold cursor-pointer ${
            activeTab === 'feedback' ? 'text-[#08228d] border-b-2 border-[#08228d]' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('feedback')}
        >
          Student Feedback
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'students' && (
        <>
          <StudentListSection
            allStudentRecords={allStudentRecords.map(student => ({
              ...student,
              status: studentStatuses[student.email] === 'pendingPayment' ? 'pendingPayment' : 'registered',
            }))}
            onViewPending={() => {}}
            pendingApps={pendingApps}
            setPendingApps={setPendingApps}
            setProfileModal={setProfileModal}
            archivedStudents={archivedStudents}
            setArchivePrompt={setArchivePrompt}
            variant="registeredOnly"
            onAllowPayment={(email, name) => handleAllowPayment()}
          />

          <div className="flex justify-center mt-6">
            <button
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 shadow text-sm cursor-pointer"
              onClick={handleAllowPayment}
            >
              Allow for Payment
            </button>
          </div>
        </>
      )}

      {activeTab === 'feedback' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#08228d] mb-4">Student Feedback for {programName}</h2>
          {programStudentFeedback.length === 0 ? (
            <p className="text-gray-500 italic">No student feedback available for this program yet.</p>
          ) : (
            <div className="space-y-6">
              {programStudentFeedback.map(feedback => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>{feedback.studentName}</strong> ({feedback.studentEmail}) - {feedback.date}
                  </p>

                  {feedback.programFeedback && (
                    <div>
                      <p className="font-bold text-gray-800">Program Feedback: <span className="font-normal">{feedback.programFeedback.programName}</span></p>
                      <div className="flex items-center mb-2">
                        {renderStars(feedback.programFeedback.rating)}
                        <span className="ml-2 text-sm text-gray-700">({feedback.programFeedback.rating}/5)</span>
                      </div>
                      <p className="text-gray-700 italic text-sm">"{feedback.programFeedback.comment}"</p>
                    </div>
                  )}

                  {feedback.instructorFeedback && (
                    <div className="mt-2">
                      <p className="font-bold text-gray-800">Instructor Feedback: <span className="font-normal">{feedback.instructorFeedback.instructorName}</span></p>
                      <div className="flex items-center mb-2">
                        {renderStars(feedback.instructorFeedback.rating)}
                        <span className="ml-2 text-sm text-gray-700">({feedback.instructorFeedback.rating}/5)</span>
                      </div>
                      <p className="text-gray-700 italic text-sm">"{feedback.instructorFeedback.comment}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <AllowPaymentModal
        isOpen={allowPaymentModal}
        programName={programName}
        onValidate={handleValidatePayment}
        onClose={() => setAllowPaymentModal(false)}
      />
    </div>
  );
}