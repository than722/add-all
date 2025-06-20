'use client';
import EditCourseOutline from '@/components/editcourseoutlineComponents/EditCourseOutline';
import { useRouter } from 'next/navigation';

export default function SuperAdminEditCourseOutlineClient({ programName }: { programName: string }) {
  const router = useRouter();
  return (
    <EditCourseOutline
      programName={programName}
      onBackClick={() => router.push(`/admin/programlist/${encodeURIComponent(programName)}`)}
      backButtonText={`← Back to ${decodeURIComponent(programName)}`}
    />
  );
}
