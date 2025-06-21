import ProgramDetailsBase from '@/components/Programs/ProgramDetailsBase';
import ProgramActionsClient from '@/components/Programs/ProgramActionsClient';

interface SuperAdminProgramDetailsPageProps {
  params: {
    programName: string;
  };
}

export default async function SuperAdminProgramDetailsPage({ params }: SuperAdminProgramDetailsPageProps) {
  const programName = decodeURIComponent(params.programName);

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgramDetailsBase programName={programName} />
      <ProgramActionsClient programName={programName} />
    </div>
  );
}
