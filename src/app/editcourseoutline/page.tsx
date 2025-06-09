import React from 'react';
import Navbar from '@/components/ui/navbar/Navbar';
import EditCourseOutlineClient from '@/components/editcourseoutlineClient/editcourseoutlineClient';

export default function EditCourseOutlinePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <EditCourseOutlineClient />
    </div>
  );
}
