export interface RemarkReply {
  sender: 'instructor' | 'student';
  message: string;
}

export interface Remark {
  id: number;
  title: string;
  content: string;
  instructorName: string;
  conversation: RemarkReply[];
}

export const demoRemarksData: { [studentEmail: string]: Remark[] } = {
  'student1@gmail.com': [
    {
      id: 1,
      title: 'Class Participation',
      content: 'Please participate more actively in class discussions.',
      instructorName: 'Mr. Johnson',
      conversation: [
        { sender: 'instructor', message: 'Please participate more actively in class discussions.' },
        { sender: 'student', message: 'Thank you for the feedback, I will participate more!' },
      ],
    },
    {
      id: 2,
      title: 'Late Submission',
      content: 'You missed the last assignment deadline.',
      instructorName: 'Ms. Smith',
      conversation: [{ sender: 'instructor', message: 'You missed the last assignment deadline.' }],
    },
  ],
};
