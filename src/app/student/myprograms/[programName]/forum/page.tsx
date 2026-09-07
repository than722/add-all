import ForumClient from '@/components/Forum/ForumClient';

interface StudentProgramForumPageProps {
  params: { programName: string };
}

export default function StudentProgramForumPage({ params }: StudentProgramForumPageProps) {
  const { programName } = params;

  return (
    <ForumClient
      programName={decodeURIComponent(programName)}
      backRoute={`/student/myprograms/${encodeURIComponent(programName)}`}
    />
  );
}
