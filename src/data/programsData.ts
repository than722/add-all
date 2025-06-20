import { Program } from './data'; // Make sure the path is correct based on your project structure

// Define categories for filtering or UI use
export const programCategories = [
  {
    category: 'ARTS AND DESIGN',
    programs: [
      'Floristry',
      'Basic Soap Making',
      'Mindanao Arts and Culture',
      'Polymer Clay',
      'Pencil Portraiture',
      'Basic Oil Painting',
      'Hair and Make-up',
      'Acrylic Painting',
      'Figure Painting',
      'Urban Gardening',
      'Aromatherapy',
      'Sewing for Home',
    ],
  },
  {
    category: 'Business and Finance',
    programs: [
      'Financial Statements: Preparation, Presentation and Analysis',
      'Fundamentals of Governance, Business Ethics, Risk Management, and Internal Control',
      'Research in Finance',
      'Investment Analysis',
      'Capital Markets',
      'Customer Grouping',
    ],
  },
];

// Create a detailed list of programs aligned with the `Program` interface
export const programsList: Program[] = [
  {
    program: 'Floristry',
    category: 'ARTS AND DESIGN',
    instructor: 'John Doe',
    date: 'June 10, 2025',
    time: '2:00 PM - 5:00 PM',
    sessions: '6',
    description: 'Learn the art of floral design from the basics to advanced techniques.',
    thumbnail: '/images/programs/floristry.jpg',
    curriculum: 'Module 1: Basics of Floristry\nModule 2: Flower Arrangement',
  },
  {
    program: 'Basic Soap Making',
    category: 'ARTS AND DESIGN',
    instructor: 'Jane Smith',
    date: 'July 5, 2025',
    time: '9:00 AM - 12:00 PM',
    sessions: '5',
    description: 'Create handmade soaps using safe and creative techniques.',
    thumbnail: '/images/programs/soapmaking.jpg',
  },
  {
    program: 'Investment Analysis',
    category: 'Business and Finance',
    instructor: 'Jane Smith',
    date: 'August 15, 2025',
    time: '1:00 PM - 4:00 PM',
    sessions: '4',
    description: 'Learn techniques to analyze investment opportunities effectively.',
    thumbnail: '/images/programs/investment.jpg',
  },
  // ✅ Add more full program entries here as needed
];

// Optional: export a utility to get program by name (e.g., in ProgramActionsClient)
export const getProgramByName = (name: string): Program | undefined =>
  programsList.find((p) => p.program.toLowerCase() === name.toLowerCase());
