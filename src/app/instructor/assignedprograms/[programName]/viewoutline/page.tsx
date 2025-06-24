import CourseOutlineViewClient from '@/components/Programs/CourseOutlineView'; 

interface InstructorProgramOutlinePageProps {
  params: {
    programName: string; // From the dynamic route
  };
}

// This is a server component
export default async function InstructorProgramOutlinePage({
  params,
}: InstructorProgramOutlinePageProps) {
  const { programName } = params;

  return <CourseOutlineViewClient programName={programName} />;
}
