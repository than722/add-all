// app/data/data.ts
// This file contains dummy data for programs, instructors, students, admins,
// and their associated types and statuses.

export interface PendingApplication {
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
  program: string;
}

// Updated Instructor interface to align with `User` type in hooks
export interface Instructor {
  name: string;
  email: string;
  img: string; // Ensure img is always present or nullable if not always provided by source
  bio: string;
  contact: string; // Ensure contact is always present as a string
  programs?: string[]; // Added for potential program assignments
  rating?: number; // Added for potential instructor ratings
  students?: string[]; // Added for potential list of students
}

// Updated Student interface to align with `User` type in hooks
export interface Student {
  name: string;
  email: string;
  img: string; // Ensure img is always present or nullable
  bio: string;
  status: 'pending' | 'enrolled';
  contact: string; // Ensure contact is always present as a string
}

// New or updated Admin interface to match `User` type in hooks
export interface Admin {
  name: string;
  email: string;
  contact: string;
  position: string; // Ensure position is always present as a string
  isAdmin: boolean;
  img?: string; // Added img for consistency with User interface
}

// NEW: Define StudentRecord interface for consolidated student data
export interface StudentRecord {
  name: string;
  email: string;
  img: string;
  bio: string;
  contact: string;
  status: 'registered' | 'pending' | 'enrolled';
  program?: string;
  receiptUrl?: string;
  paymentType?: string;
}

// Raw Data Arrays
export const instructors: Instructor[] = [
  { name: 'John Doe', email: 'john@school.edu', img: '/profileicon.png', bio: 'Expert in Fine Arts. 10 years teaching experience.', contact: '09123456789', programs: ['Floristry'], rating: 4.5, students: ['alice@email.com'] },
  { name: 'Jane Smith', email: 'jane@school.edu', img: '/profileicon.png', bio: 'Specialist in Business and Finance.', contact: '09234567890', programs: ['Financial Statements: Preparation, Presentation and Analysis'], rating: 4.8, students: ['bob@email.com'] },
  { name: 'Mark Lee', email: 'mark@school.edu', img: '/profileicon.png', bio: 'Polymer clay and crafts instructor.', contact: '09345678901', programs: ['Polymer Clay'], rating: 4.2, students: [] },
];

export const students: Student[] = [
  { name: 'Alice Johnson', email: 'alice@email.com', img: '/profileicon.png', bio: 'Enthusiastic learner.', status: 'enrolled', contact: '09111222333' },
  { name: 'Bob Smith', email: 'bob@email.com', img: '/profileicon.png', bio: 'Aspiring artist.', status: 'pending', contact: '09444555666' },
  { name: 'Charlie Lee', email: 'charlie@email.com', img: '/profileicon.png', bio: 'Interested in finance.', status: 'pending', contact: '09777888999' },
];

export const admins: Admin[] = [
  { name: "Super Admin", email: "superadmin@add-all.edu", contact: "09123456789", position: "Super Admin", isAdmin: true, img: '/profileicon.png' },
  { name: "Admin User", email: "admin@add-all.edu", contact: "09112223333", position: "Employee", isAdmin: true, img: '/profileicon.png' }, // Example admin
  { name: "John Doe", email: "john@school.edu", contact: "09123456789", position: "Instructor", isAdmin: false, img: '/profileicon.png' }, // Example: An instructor who is not an admin
  { name: "Jane Smith", email: "jane@school.edu", contact: "09234567890", position: "Instructor", isAdmin: false, img: '/profileicon.png' },
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

export const demoEnrolledStudentsKey = 'pendingApps_Floristry';
export const demoEnrolledStudentsValue = JSON.stringify([
  {
    name: 'Alice Johnson',
    email: 'alice@email.com',
    receiptUrl: '/receipt.png',
    paymentType: 'GCash',
    status: 'enrolled',
    program: 'Floristry',
  },
  {
    name: 'Bob Smith',
    email: 'bob@email.com',
    receiptUrl: '/receipt.png',
    paymentType: 'Bank Transfer',
    status: 'enrolled',
    program: 'Basic Soap Making',
  },
]);

export const demoStudentListData: Record<string, Array<{
  name: string;
  email: string;
  receiptUrl: string;
  paymentType: string;
  status: 'pending' | 'enrolled';
  program: string;
}>> = {
  'Floristry': [
    {
      name: 'Alice Johnson',
      email: 'alice@email.com',
      receiptUrl: '/receipt.png',
      paymentType: 'GCash',
      status: 'enrolled',
      program: 'Floristry',
    },
    {
      name: 'Bob Smith',
      email: 'bob@email.com',
      receiptUrl: '/receipt.png',
      paymentType: 'Bank Transfer',
      status: 'enrolled',
      program: 'Floristry',
    },
    {
      name: 'Charlie Lee',
      email: 'charlie@email.com',
      receiptUrl: '/receipt.png',
      paymentType: 'GCash',
      status: 'pending',
      program: 'Floristry',
    },
  ],
  'Basic Soap Making': [
    {
      name: 'Diana Cruz',
      email: 'diana@email.com',
      receiptUrl: '/receipt.png',
      paymentType: 'Bank Transfer',
      status: 'enrolled',
      program: 'Basic Soap Making',
    },
    {
      name: 'Ethan Wright',
      email: 'ethan@email.com',
      receiptUrl: '/receipt.png',
      paymentType: 'GCash',
      status: 'pending',
      program: 'Basic Soap Making',
    },
  ],
};

export const dummyPendingApps: PendingApplication[] = [
  {
    name: 'Alice Johnson',
    email: 'alice@email.com',
    receiptUrl: '/receipt.png',
    paymentType: 'cash',
    status: 'pending',
    program: 'Floristry',
  },
  {
    name: 'Bob Smith',
    email: 'bob@email.com',
    receiptUrl: '/receipt.png',
    paymentType: 'online',
    status: 'pending',
    program: 'Investment Analysis',
  },
];

// Consistent Program type definition (can be imported from programsData if it's more definitive there)
export interface Program {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
  curriculum?: string[]; // Optional curriculum field for programs
}
export const blankProgramForm: Program = {
  program: '',
  category: '',
  instructor: '',
  date: '',
  time: '',
  sessions: '',
  description: '',
  thumbnail: '',
  curriculum: [],
};


// UserRole from roles/role.ts (assuming external definition)
export type UserRole = 'superadmin' | 'admin' | 'teacher' | 'student' | 'guest';

export const getRole = (roleNumber: number): UserRole => {
    switch (roleNumber) {
        case 1: return 'student';
        case 2: return 'teacher';
        case 3: return 'admin';
        case 4: return 'superadmin';
        default: return 'guest';
    }
};
