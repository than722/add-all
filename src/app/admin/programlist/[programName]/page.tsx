import ProgramDetailsBase from '@/components/Programs/ProgramDetailsBase';
import ProgramActionsClient from '@/components/Programs/ProgramActionsClient';

interface AdminProgramDetailsPageProps {
  params: {
    programName: string;
  };
}

export default async function AdminProgramDetailsPage({ params }: AdminProgramDetailsPageProps) {
    const programName = decodeURIComponent(params.programName);

  return (
    <div className="min-h-screen bg-gray-100">
      <ProgramDetailsBase programName={programName} />
      <ProgramActionsClient programName={programName} />
    </div>
  );
}
