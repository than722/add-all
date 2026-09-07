'use client';

import React, { useState } from 'react';
import StudentsSection from './StudentSection';
import Profile from '@/components/ui/Modals/ProfileModals/profileview';
import PendingModal from '@/components/ui/Modals/AdminModals/pendingModal';
import ArchiveModal from '@/components/ui/Modals/AdminModals/archiveModal';

import {
  students as initialStudents,
  dummyPendingApps,
  demoStudentListData,
  PendingApplication,
} from '@/data/data';

interface StudentRecord {
  name: string;
  email: string;
  img: string;
  bio: string;
  contact: string;
  status: 'registered' | 'pending' | 'enrolled' | 'pendingPayment';
  program?: string;
  receiptUrl?: string;
  paymentType?: string;
}

interface ArchivePrompt {
  open: boolean;
  type: 'instructor' | 'student' | 'program';
  name: string;
}

export default function AdminStudentListClient() {
  const [allStudentRecords, setAllStudentRecords] = useState<StudentRecord[]>(() => {
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
    const processedEmails = new Set<string>();

    consolidatedApplications.forEach(app => {
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
      processedEmails.add(app.email);
    });

    initialStudents.forEach(student => {
      if (!processedEmails.has(student.email)) {
        records.push({
          name: student.name,
          email: student.email,
          img: student.img || '/profileicon.png',
          bio: student.bio || '',
          contact: student.contact || '',
          status: 'registered',
        });
      }
    });

    return records;
  });

  const [profileModal, setProfileModal] = useState<null | {
    name: string;
    email: string;
    img: string;
    bio: string;
    type?: 'instructor' | 'student';
    contact?: string;
  }>(null);

  const [pendingModal, setPendingModal] = useState<PendingApplication | null>(null);
  const [pendingApps, setPendingApps] = useState<PendingApplication[]>(dummyPendingApps);
  const [archivedStudents, setArchivedStudents] = useState<string[]>([]);
  const [archivePrompt, setArchivePrompt] = useState<ArchivePrompt | null>(null);

  const handleConfirm = (email: string, program: string, paymentType: string) => {
    setAllStudentRecords(prev =>
      prev.map(student =>
        student.email === email && student.program === program
          ? { ...student, status: 'enrolled', paymentType }
          : student
      )
    );
    setPendingModal(null);
  };

  const handleViewStudentProfile = (student: StudentRecord) => {
    setProfileModal({
      name: student.name,
      email: student.email,
      img: student.img,
      bio: student.bio,
      type: 'student',
      contact: student.contact || 'N/A',
    });
  };

  const handleArchiveStudent = (studentName: string) => {
    setArchivedStudents((prev) => [...prev, studentName]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <StudentsSection
        allStudentRecords={allStudentRecords}
        onViewPending={(app: PendingApplication) => setPendingModal(app)}
        pendingApps={pendingApps}
        setPendingApps={setPendingApps}
        setProfileModal={setProfileModal}
        archivedStudents={archivedStudents}
        setArchivePrompt={setArchivePrompt}
        onViewProfile={handleViewStudentProfile}
      />

      {profileModal && (
        <Profile
          isOpen={true}
          onClose={() => setProfileModal(null)}
          profile={profileModal}
          isAdmin={true}
        />
      )}

      {pendingModal && (
        <PendingModal
          pendingModal={pendingModal}
          onClose={() => setPendingModal(null)}
          onConfirm={handleConfirm}
        />
      )}

      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type={archivePrompt.type}
          name={archivePrompt.name}
          onConfirm={() => {
            if (archivePrompt.type === 'student') {
              handleArchiveStudent(archivePrompt.name);
            }
            setArchivePrompt(null);
          }}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
}
