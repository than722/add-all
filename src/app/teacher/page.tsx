import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import TeacherClient from '@/components/teacherClient/teacherClient';

export default function TeacherClientPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <TeacherClient />
    </div>
  );
}
