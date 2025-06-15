import ProgramDetailsBase from '@/components/Programs/ProgramDetailsBase'; // Import the shared base component
import ProgramActionsClient from '@/components/Programs/ProgramActionsClient'; // Import the actions component

interface instructorProgramDetailsPageProps {
  params: {
    programName: string; // The dynamic segment from the URL
  };
}

// This page is now a pure Server Component (removed 'use client;')
export default async function instructorProgramDetailsPage({ params }: instructorProgramDetailsPageProps) {
  const { programName } = params;

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgramDetailsBase programName={programName} />
      {/* ProgramActionsClient will fetch the role itself */}
      <ProgramActionsClient programName={programName} />
    </div>
  );
}