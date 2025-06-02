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
      { id: 11, title: 'What is this course about?' },
      { id: 12, title: 'Course Objectives' },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Core Concepts',
    content: 'This module dives into the core concepts and foundational knowledge.',
    subsections: [
      { id: 21, title: 'Key Terms' },
      { id: 22, title: 'Fundamental Theories' },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Application',
    content: 'This module focuses on applying what you have learned.',
    subsections: [
      { id: 31, title: 'Practical Exercises' },
      { id: 32, title: 'Case Studies' },
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
