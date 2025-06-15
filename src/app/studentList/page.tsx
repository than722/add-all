import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import StudentListClient from '@/components/studentlistClient/studentlistClient';

export default function StudentListClientPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <StudentListClient />
    </div>
  );
}
