'use client';

import React from 'react';
import CourseOutline from '@/components/CourseOutlineComponent/CourseOutlineComponent';

export default function AdminCourseOutlineViewClient({ programName }: { programName: string }) {
  return (
    <CourseOutline
      programName={programName}
      backRoute={`/admin/programlist/${encodeURIComponent(programName)}`}
      backLabel={`Back to ${decodeURIComponent(programName)}`}
      welcomeMessage="Select a module from the left to view its content and subsections."
    />
  );
}
