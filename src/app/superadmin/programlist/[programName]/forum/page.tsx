import ForumClient from '@/components/Forum/ForumClient';

interface SuperAdminForumPageProps {
  params: { programName: string };
}

export default function SuperAdminProgramForumPage({ params }: SuperAdminForumPageProps) {
  const { programName } = params;

  return (
    <ForumClient
      programName={decodeURIComponent(programName)}
      backRoute={`/superadmin/programlist/${encodeURIComponent(programName)}/view-outline`}
    />
  );
}
