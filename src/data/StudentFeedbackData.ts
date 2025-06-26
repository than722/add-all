// src/data/StudentFeedbackData.ts

export interface StudentFeedback {
  id: number;
  studentName: string;
  studentEmail: string;
  programFeedback?: {
    programName: string;
    rating: number; // 1-5
    comment: string;
  };
  instructorFeedback?: {
    instructorName: string;
    instructorEmail: string;
    programName: string; // The program for which the instructor taught
    rating: number; // 1-5
    comment: string;
  };
  date: string; // e.g., "2024-06-25"
}

export const dummyStudentFeedback: StudentFeedback[] = [
  {
    id: 1,
    studentName: "Alice Johnson",
    studentEmail: "alice.johnson@example.com",
    programFeedback: {
      programName: "Floristry",
      rating: 5,
      comment: "Absolutely loved the Floristry program! Very hands-on and the content was engaging. The instructors were fantastic too!",
    },
    date: "2024-05-10",
  },
  {
    id: 2,
    studentName: "Bob Williams",
    studentEmail: "bob.williams@example.com",
    instructorFeedback: {
      instructorName: "Jane Doe",
      instructorEmail: "jane.doe@example.com",
      programName: "Floristry",
      rating: 4,
      comment: "Jane Doe was a fantastic instructor. Very knowledgeable and always willing to help. Her passion for floristry was contagious!",
    },
    date: "2024-05-12",
  },
  {
    id: 3,
    studentName: "Charlie Brown",
    studentEmail: "charlie.brown@example.com",
    programFeedback: {
      programName: "Acrylic Painting",
      rating: 4,
      comment: "Good introduction to acrylics, but wished there were more advanced techniques covered. Overall, a solid foundation.",
    },
    date: "2024-06-01",
  },
  {
    id: 4,
    studentName: "Alice Johnson",
    studentEmail: "alice.johnson@example.com",
    instructorFeedback: {
      instructorName: "John Smith",
      instructorEmail: "john.smith@example.com",
      programName: "Digital Art",
      rating: 5,
      comment: "John Smith made Digital Art so accessible and fun! His explanations were clear and he gave great personalized feedback.",
    },
    date: "2024-06-05",
  },
  {
    id: 5,
    studentName: "Dana Lee",
    studentEmail: "dana.lee@example.com",
    programFeedback: {
      programName: "Digital Art",
      rating: 3,
      comment: "The digital art course was okay, but I struggled with some of the software. More step-by-step guidance would be helpful, perhaps some video tutorials.",
    },
    date: "2024-06-20",
  },
  {
    id: 6,
    studentName: "Eva Green",
    studentEmail: "eva.green@example.com",
    instructorFeedback: {
      instructorName: "Emily White",
      instructorEmail: "emily.white@example.com",
      programName: "Basic Photography",
      rating: 5,
      comment: "Emily White is an amazing photographer and an even better teacher! She inspired me to take my camera everywhere.",
    },
    date: "2024-06-22",
  },
  {
    id: 7,
    studentName: "Frank Black",
    studentEmail: "frank.black@example.com",
    programFeedback: {
      programName: "Basic Photography",
      rating: 4,
      comment: "The photography program covered all the basics well. It would be great to have a follow-up advanced course.",
    },
    date: "2024-06-25",
  },
  {
    id: 8,
    studentName: "Alice Johnson",
    studentEmail: "alice.johnson@example.com",
    instructorFeedback: {
      instructorName: "Emily White",
      instructorEmail: "emily.white@example.com",
      programName: "Basic Photography",
      rating: 4,
      comment: "Emily's feedback was constructive and really helped me improve my shots. She creates a very supportive learning environment.",
    },
    date: "2024-07-01",
  },
];

// Helper to filter feedback by program name
export const getFeedbackForProgram = (programName: string) => {
    return dummyStudentFeedback.filter(feedback =>
        (feedback.programFeedback && feedback.programFeedback.programName === programName) ||
        (feedback.instructorFeedback && feedback.instructorFeedback.programName === programName)
    );
};
