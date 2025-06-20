'use client';

import React from 'react';
import CourseOutline from '@/components/CourseOutlineComponent/CourseOutlineComponent'

export default function StudentCourseOutlineView({ programName }: { programName: string }) {
  return (
    <CourseOutline
      programName={programName}
      backRoute="/student/myprograms"
      backLabel="My Programs"
      welcomeMessage="Select a module from the left to view its content and subsections."
    />
  );
}
