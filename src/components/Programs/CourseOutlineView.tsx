'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/contexts/authContext';
import CourseOutline from '@/components/CourseOutlineComponent/CourseOutlineComponent';

interface Props {
  programName: string;
}

const CourseOutlineViewClient: React.FC<Props> = ({ programName }) => {
  const { role } = useAuth();
  const router = useRouter();

      useEffect(() => {
      if (role === 'guest') {
        router.push('/'); // or /login
      } else if (role && role !== 'student' && role !== 'instructor') {
        router.push('/unauthorized');
      }
    }, [role, router]);

  if (!role) return <div>Loading...</div>;

  const isInstructor = role === 'instructor';

  return (
    <div className="p-4">
      <CourseOutline
        programName={programName}
        readOnly={!isInstructor}
        backRoute={isInstructor ? `/instructor/assignedprograms/${programName}` : '/student/myprograms'}
        backLabel={isInstructor ? `Back to ${programName}` : 'Back to My Programs'}
        welcomeMessage={`Welcome to the ${programName} course outline.`}
      />
    </div>
  );
};

export default CourseOutlineViewClient;
