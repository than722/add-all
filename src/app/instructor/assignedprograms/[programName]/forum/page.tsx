import ForumClient from '@/components/Forum/ForumClient';

interface ProgramForumPageProps {
  params: {
    programName: string;
  };
}

export default function ProgramForumPage({ params }: ProgramForumPageProps) {
  const { programName } = params;
  return <ForumClient programName={decodeURIComponent(programName)} />;
}
