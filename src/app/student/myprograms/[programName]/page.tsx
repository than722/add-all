import CourseOutlineViewClient from '@/components/Programs/CourseOutlineView'; // Import the new client component

interface MyProgramOutlinePageProps {
  params: {
    programName: string; // The dynamic segment from the URL, e.g., "Floristry"
  };
}

// This page is a Server Component (no 'use client' at the top)
export default async function MyProgramOutlinePage({ params }: MyProgramOutlinePageProps) {
  const { programName } = params; // Extract the dynamic programName from the URL parameters

  return (
    // Render the CourseOutlineViewClient, passing the programName as a prop
    <CourseOutlineViewClient programName={programName} />
  );
}