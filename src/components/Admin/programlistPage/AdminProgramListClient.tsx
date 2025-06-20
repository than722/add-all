import React from 'react';
import ProgramListComponent from '@/components/ProgramListComponents/ProgramListComponent';
import { programsList } from '@/data/programsData';
import { dummyDetails } from '@/data/data';

const AdminProgramListClient: React.FC = () => {
  const initialPrograms = programsList.map((p) => ({
    program: p.program,
    category: p.category,
    instructor: dummyDetails.instructor,
    date: dummyDetails.date,
    time: dummyDetails.timeAndSessions.split(' | ')[0],
    sessions: dummyDetails.timeAndSessions.split(' | ')[1].replace(' Sessions', ''),
    description: dummyDetails.description,
    thumbnail: '/add-all logo bg.png',
  }));

  return <ProgramListComponent role="admin" allPrograms={initialPrograms} pageTitle="Programs List (Admin)" />;
};

export default AdminProgramListClient;
