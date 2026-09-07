
import InstructorsAssignedPrograms from '@/components/Programs/Instructor/InstructorsAssignedPrograms';

interface PageProps {
  params: {
    programName: string;
  };
}

export default function InstructorProgramDetailsPage({ params }: PageProps) {
  const { programName } = params;

  return <InstructorsAssignedPrograms programName={programName} />;
}