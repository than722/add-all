import ProgramDetailsBase from '@/components/Programs/ProgramDetailsBase'; // Import the shared base component
import ProgramActionsClient from '@/components/Programs/ProgramActionsClient'; // Import the actions component

interface InstructorProgramDetailsPageProps {
  params: {
    programName: string; // The dynamic segment from the URL (still URL-encoded)
  };
}

// This page is a pure Server Component (no 'use client')
export default async function InstructorProgramDetailsPage({ params }: InstructorProgramDetailsPageProps) {
  const decodedProgramName = decodeURIComponent(params.programName); // ✅ Decode the programName first

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgramDetailsBase programName={decodedProgramName} />
      {/* ProgramActionsClient will fetch the role itself */}
      <ProgramActionsClient programName={decodedProgramName} />
    </div>
  );
}
