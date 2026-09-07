import ProgramStudentsSection from '@/components/ProgramStudentList/ProgramStudentsClient';

interface PageProps {
  params: { programName: string };
}

export default function ProgramStudentsPage({ params }: PageProps) {
  const programName = decodeURIComponent(params.programName);
  const role = 'admin';

  return (
    <ProgramStudentsSection programName={programName} role={role} />
  );
}
