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
      router.push('/'); // Redirect guests
    } else if (role && role !== 'student' && role !== 'instructor') {
      router.push('/unauthorized');
    }
  }, [role, router]);

  if (!role) return <div>Loading...</div>;

  const isInstructor = role === 'instructor';

  // ✅ Back button route and label (existing)
  const backRoute = isInstructor
    ? `/instructor/assignedprograms/${encodeURIComponent(programName)}`
    : '/student/myprograms';

  const backLabel = isInstructor
    ? `Back to ${decodeURIComponent(programName)}`
    : 'My Programs';

  // ✅ Forum button route (new)
  const forumRoute = isInstructor
    ? `/instructor/assignedprograms/${encodeURIComponent(programName)}/forum`
    : `/student/myprograms/${encodeURIComponent(programName)}/forum`;

  return (
    <div className="p-4">
      <CourseOutline
        programName={programName}
        readOnly={!isInstructor}
        backRoute={backRoute}
        backLabel={backLabel}
        welcomeMessage={`Welcome to the ${decodeURIComponent(programName)} course outline.`}
        forumRoute={forumRoute} // ✅ Pass forumRoute here
      />
    </div>
  );
};

export default CourseOutlineViewClient;
