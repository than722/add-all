// app/admin/programs/[programName]/edit/page.tsx

import AdminEditCourseOutlineClient from '@/components/Admin/programlistPage/AdminEditCourseOutline'; // Use a dedicated Admin client component

interface AdminEditOutlinePageProps {
  params: {
    programName: string;
  };
}

export default async function AdminEditOutlinePage({ params }: AdminEditOutlinePageProps) {
  const { programName } = params;

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminEditCourseOutlineClient programName={programName} />
    </div>
  );
}
