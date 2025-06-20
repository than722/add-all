'use client';
import EditCourseOutline from '@/components/editcourseoutlineComponents/EditCourseOutline';
import { useRouter } from 'next/navigation';

export default function InstructorEditCourseOutlineClient({ programName }: { programName: string }) {
  const router = useRouter();
  return (
    <EditCourseOutline
      programName={programName}
      onBackClick={() => router.push(`/instructor/assignedprograms/${programName}`)}
      backButtonText={`← Back to ${decodeURIComponent(programName)} Details`}
    />
  );
}
