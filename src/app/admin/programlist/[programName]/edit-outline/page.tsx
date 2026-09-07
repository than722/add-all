

import AdminEditCourseOutlineClient from '@/components/Admin/programlistPage/AdminEditCourseOutline'; // Use a dedicated Admin client component

interface AdminEditOutlinePageProps {
  params: Promise<{
    programName: string;
  }>;
}

export default async function AdminEditOutlinePage({ params }: AdminEditOutlinePageProps) {
  const resolvedParams = await params;
  const programName = decodeURIComponent(resolvedParams.programName);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminEditCourseOutlineClient programName={programName} />
    </div>
  );
}
