import EditCourseOutlineClient from '@/components/Programs/EditCourseOutlineClient'; // Import the unified client component

interface TeacherEditOutlinePageProps {
  params: {
    programName: string; // The dynamic segment from the URL
  };
}

// This page is a pure Server Component
export default async function TeacherEditOutlinePage({ params }: TeacherEditOutlinePageProps) {
  const { programName } = params;

  return (
    <div className="min-h-screen bg-gray-100"> {/* Consistent background */}
      {/* Pass programName and role as 'instructor' */}
      <EditCourseOutlineClient programName={programName} role="instructor" />
    </div>
  );
}