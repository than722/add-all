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
  // You can add more categories and programs here as needed
];

// This flattens the structured categories into a single list of programs,
// where each program object includes its category, suitable for direct display.
export const programsList = programCategories.flatMap(({ category, programs }) =>
  programs.map((program) => ({
    program,
    category,
  }))
);