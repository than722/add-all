import ForumClient from '@/components/Forum/ForumClient';

interface AdminProgramForumPageProps {
  params: { programName: string };
}

export default function AdminProgramForumPage({ params }: AdminProgramForumPageProps) {
  const { programName } = params;

  return (
    <ForumClient
      programName={decodeURIComponent(programName)}
      backRoute={`/admin/programlist/${encodeURIComponent(programName)}/view-outline`}
    />
  );
}
