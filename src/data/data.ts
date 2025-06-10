export interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
  program: string;
}

export const instructors = [
  { name: 'John Doe', email: 'john@school.edu', img: '/profileicon.png', bio: 'Expert in Fine Arts. 10 years teaching experience.' },
  { name: 'Jane Smith', email: 'jane@school.edu', img: '/profileicon.png', bio: 'Specialist in Business and Finance.' },
  { name: 'Mark Lee', email: 'mark@school.edu', img: '/profileicon.png', bio: 'Polymer clay and crafts instructor.' },
];

export const students = [
  { name: 'Alice Johnson', email: 'alice@email.com', img: '/profileicon.png', bio: 'Enthusiastic learner.' },
  { name: 'Bob Smith', email: 'bob@email.com', img: '/profileicon.png', bio: 'Aspiring artist.' },
  { name: 'Charlie Lee', email: 'charlie@email.com', img: '/profileicon.png', bio: 'Interested in finance.' },
];

export const dummyDetails = {
  description:
    'This is a placeholder description of the program. It provides information about the program objectives, topics covered, and what participants can expect.',
  timeAndSessions: '2:00 PM - 5:00 PM | 6 Sessions',
  date: 'June 10, 2025 - July 15, 2025',
  instructor: 'John Doe',
};

export const dummyStudents = [
  { name: 'Alice Johnson', email: 'alice@email.com' },
  { name: 'Bob Smith', email: 'bob@email.com' },
  { name: 'Charlie Lee', email: 'charlie@email.com' },
];

export const moduleProgress: Record<number, number> = {
  1: 60,
  2: 30,
  3: 80,
};

export const subsectionProgress: Record<number, number> = {
  11: 100,
  12: 20,
  21: 0,
  22: 60,
  31: 80,
  32: 90,
};

export const initialCourseOutline = [
  {
    id: 1,
    title: 'Module 1: Introduction',
    content: 'This module covers the basics and overview of the course.',
    subsections: [
      { id: 11, title: 'What is this course about?', content: 'This subsection explains what the course is about, its scope, and its intended audience.' },
      { id: 12, title: 'Course Objectives', content: 'This subsection lists the objectives and learning outcomes for the course.' },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Core Concepts',
    content: 'This module dives into the core concepts and foundational knowledge.',
    subsections: [
      { id: 21, title: 'Key Terms', content: 'This subsection defines key terms and vocabulary used throughout the course.' },
      { id: 22, title: 'Fundamental Theories', content: 'This subsection covers the fundamental theories relevant to the course.' },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Application',
    content: 'This module focuses on applying what you have learned.',
    subsections: [
      { id: 31, title: 'Practical Exercises', content: 'This subsection provides practical exercises for hands-on learning.' },
      { id: 32, title: 'Case Studies', content: 'This subsection presents case studies for analysis and discussion.' },
    ],
  },
];

export const programPrices: Record<string, number> = {
  'Floristry': 1500,
  'Basic Soap Making': 1200,
  'Mindanao Arts and Culture': 1000,
  'Polymer Clay': 900,
  'Pencil Portraiture': 1100,
  'Basic Oil Painting': 1600,
  'Hair and Make-up': 2000,
  'Acrylic Painting': 1400,
  'Figure Painting': 1700,
  'Urban Gardening': 800,
  'Aromatherapy': 950,
  'Sewing for Home': 1300,
  'Financial Statements: Preparation, Presentation and Analysis': 1800,
  'Fundamentals of Governance, Business Ethics, Risk Management, and Internal Control': 1750,
  'Research in Finance': 1900,
  'Investment Analysis': 2100,
  'Capital Markets': 1950,
  'Customer Grouping': 1250,
};

// Add instructorStatus dummy data
export const instructorStatus: Record<string, 'active' | 'inactive'> = {
  'john@school.edu': 'active',
  'jane@school.edu': 'inactive',
  'mark@school.edu': 'active',
};

// Dummy enrolled students for a program (simulate localStorage for studentList demo)
export const demoEnrolledStudentsKey = 'pendingApps_Floristry';
export const demoEnrolledStudentsValue = JSON.stringify([
  {
    name: 'Alice Johnson',
    email: 'alice@email.com',
    receiptUrl: '',
    paymentType: 'GCash',
    status: 'enrolled',
  },
  {
    name: 'Bob Smith',
    email: 'bob@email.com',
    receiptUrl: '',
    paymentType: 'Bank Transfer',
    status: 'enrolled',
  },
]);

// Dummy admin data for superadmin page
export const admins = [
  { name: "Super Admin", email: "superadmin@add-all.edu", contact: "09123456789", position: "Employee", isAdmin: true },
  { name: "John Doe", email: "john@school.edu", contact: "09112223333", position: "Employee", isAdmin: false },
  { name: "Jane Smith", email: "jane@school.edu", contact: "09114445555", position: "Employee", isAdmin: false },
];

// Demo enrolled students for StudentListPage (simulate localStorage for different programs)
export const demoStudentListData: Record<string, Array<{
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
}>> = {
  'Floristry': [
    {
      name: 'Alice Johnson',
      email: 'alice@email.com',
      receiptUrl: 'https://example.com/receipt1.jpg',
      paymentType: 'GCash',
      status: 'enrolled',
    },
    {
      name: 'Bob Smith',
      email: 'bob@email.com',
      receiptUrl: 'https://example.com/receipt2.jpg',
      paymentType: 'Bank Transfer',
      status: 'enrolled',
    },
    {
      name: 'Charlie Lee',
      email: 'charlie@email.com',
      receiptUrl: 'https://example.com/receipt3.jpg',
      paymentType: 'GCash',
      status: 'pending',
    },
  ],
  'Basic Soap Making': [
    {
      name: 'Diana Cruz',
      email: 'diana@email.com',
      receiptUrl: 'https://example.com/receipt4.jpg',
      paymentType: 'Bank Transfer',
      status: 'enrolled',
    },
    {
      name: 'Ethan Wright',
      email: 'ethan@email.com',
      receiptUrl: 'https://example.com/receipt5.jpg',
      paymentType: 'GCash',
      status: 'pending',
    },
  ],
};

// Dummy pending applications for admin
export const dummyPendingApps: PendingApplication[] = [
  {
    name: 'Alice Johnson',
    email: 'alice@email.com',
    receiptUrl: '/add-all image 1.jpg',
    paymentType: 'cash',
    status: 'pending',
    program: 'Floristry',
  },
  {
    name: 'Bob Smith',
    email: 'bob@email.com',
    receiptUrl: '/add-all image 2.jpg',
    paymentType: 'online',
    status: 'pending',
    program: 'Investment Analysis',
  },
];

// --- Types for program and instructor ---
export interface Program {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
}

export interface Instructor {
  name: string;
  email: string;
  contact: string;
  img: string;
  bio: string;
}
