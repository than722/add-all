import SuperAdminCourseOutlineViewClient from '@/components/SuperAdmin/programPage/SuperAdminCourseOutlineView'; 

interface SuperAdminViewOutlinePageProps {
  params: {
    programName: string;
  };
}
export default async function SuperAdminViewOutlinePage({ params }: SuperAdminViewOutlinePageProps) {
   const programName = decodeURIComponent(params.programName);

  return (
    <div className="min-h-screen bg-gray-100"> {/* Consistent background */}
      <SuperAdminCourseOutlineViewClient programName={programName} />
    </div>
  );
}