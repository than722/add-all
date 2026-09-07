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
  StudentRecord,
} from '@/data/data';

interface ArchivePrompt {
  open: boolean;
  type: 'instructor' | 'student' | 'program';
  name: string;
}

export default function SuperAdminStudentListClient() {
  const [allStudentRecords, setAllStudentRecords] = useState<StudentRecord[]>(() => {
    const studentProfilesMap = new Map<string, typeof initialStudents[0]>();
    initialStudents.forEach((s) => studentProfilesMap.set(s.email, s));

    const consolidatedApplications = new Map<string, PendingApplication>();
    dummyPendingApps.forEach((app) => {
      consolidatedApplications.set(`${app.email}_${app.program}`, app);
    });

    Object.values(demoStudentListData)
      .flat()
      .forEach((app) => {
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

    consolidatedApplications.forEach((app) => {
      const studentProfile = studentProfilesMap.get(app.email);
      records.push({
        name: studentProfile?.name || app.name,
        email: app.email,
        img: studentProfile?.img || '/profileicon.png',
        bio: studentProfile?.bio || 'No bio provided.',
        contact: studentProfile?.contact || 'N/A',
        status: app.status,
        program: app.program,
        receiptUrl: app.receiptUrl,
        paymentType: app.paymentType,
      });
      processedEmails.add(app.email);
    });

    initialStudents.forEach((student) => {
      if (!processedEmails.has(student.email)) {
        records.push({
          name: student.name,
          email: student.email,
          img: student.img || '/profileicon.png',
          bio: student.bio || 'No bio provided.',
          contact: student.contact || 'N/A',
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

  // ✅ Now with paymentType handling
  const handleConfirm = (email: string, program: string, paymentType: string) => {
    setAllStudentRecords((prev) =>
      prev.map((student) =>
        student.email === email && student.program === program
          ? { ...student, status: 'enrolled', paymentType }
          : student
      )
    );

    setPendingApps((prev) =>
      prev.map((app) =>
        app.email === email && app.program === program
          ? { ...app, status: 'enrolled', paymentType }
          : app
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

  const handleArchiveStudent = (name: string) => {
    setArchivedStudents((prev) => [...prev, name]);
    setArchivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <StudentsSection
        allStudentRecords={allStudentRecords}
        onViewProfile={handleViewStudentProfile}
        onViewPending={(app) => setPendingModal(app)}
        pendingApps={pendingApps}
        setPendingApps={setPendingApps}
        setProfileModal={setProfileModal}
        archivedStudents={archivedStudents}
        setArchivePrompt={setArchivePrompt}
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
          onConfirm={(email, program, paymentType) => handleConfirm(email, program, paymentType)}
        />
      )}

      {archivePrompt && (
        <ArchiveModal
          isOpen={!!archivePrompt.open}
          type={archivePrompt.type}
          name={archivePrompt.name}
          onConfirm={() => handleArchiveStudent(archivePrompt.name)}
          onCancel={() => setArchivePrompt(null)}
        />
      )}
    </div>
  );
}
