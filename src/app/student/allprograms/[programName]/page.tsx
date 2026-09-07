import ProgramDetailsBase from '@/components/Programs/ProgramDetailsBase'; // Import the shared base component
import ProgramActionsClient from '@/components/Programs/ProgramActionsClient'; // Import the actions component

interface StudentProgramDetailsPageProps {
  params: {
    programName: string; // The dynamic segment from the URL
  };
}

export default async function StudentProgramDetailsPage({ params }: StudentProgramDetailsPageProps) {
  const { programName } = params;

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgramDetailsBase programName={programName} />
      {/* ProgramActionsClient will fetch the role itself */}
      <ProgramActionsClient programName={programName} />
    </div>
  );
}
  