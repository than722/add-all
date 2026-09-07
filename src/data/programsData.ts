// Define the Program interface
export interface Program {
  program: string;
  category: string;
  instructor: string;
  date: string;
  time: string;
  sessions: string;
  description: string;
  thumbnail: string;
  curriculum: string[];
}

// Define categories for filtering or UI use
export interface ProgramCategory {
  category: string;
  programs: string[];
}

export const programCategories: ProgramCategory[] = [
  {
    category: 'All Categories',
    programs: []
  },
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
    thumbnail: '/floristry.jpg',
    curriculum: [
      'Module 1: Basics of Floristry',
      'Module 2: Flower Arrangement',
      'Module 3: Event Design',
      'Module 4: Practical Showcase',
    ],
  },
  {
    program: 'Basic Soap Making',
    category: 'ARTS AND DESIGN',
    instructor: 'Jane Smith',
    date: 'July 5, 2025',
    time: '9:00 AM - 12:00 PM',
    sessions: '5',
    description: 'Create handmade soaps using safe and creative techniques.',
    thumbnail: '/soapmaking.jpg',
    curriculum: [
      'Intro to Soap Making',
      'Cold Process Basics',
      'Essential Oils and Additives',
      'Mold and Curing',
      'Packaging & Safety',
    ],
  },
  {
    program: 'Mindanao Arts and Culture',
    category: 'ARTS AND DESIGN',
    instructor: 'Aisha Rahman',
    date: 'August 1, 2025',
    time: '1:00 PM - 4:00 PM',
    sessions: '8',
    description: 'Explore the rich artistic heritage and diverse cultures of Mindanao.',
    thumbnail: '/mindanao_arts.jpg',
    curriculum: [
      'Module 1: Indigenous Art Forms',
      'Module 2: Traditional Textiles and Crafts',
      'Module 3: Mindanaoan Music and Dance',
      'Module 4: Contemporary Mindanaoan Artists',
      'Module 5: Cultural Immersion Project',
    ],
  },
  {
    program: 'Polymer Clay',
    category: 'ARTS AND DESIGN',
    instructor: 'Markus Chen',
    date: 'September 15, 2025',
    time: '10:00 AM - 1:00 PM',
    sessions: '4',
    description: 'Discover the versatility of polymer clay to create jewelry, figurines, and more.',
    thumbnail: '/polymer_clay.jpg',
    curriculum: [
      'Module 1: Polymer Clay Basics and Tools',
      'Module 2: Conditioning and Color Mixing',
      'Module 3: Sculpting Techniques',
      'Module 4: Baking and Finishing',
    ],
  },
  {
    program: 'Pencil Portraiture',
    category: 'ARTS AND DESIGN',
    instructor: 'Sophia Lee',
    date: 'October 1, 2025',
    time: '3:00 PM - 6:00 PM',
    sessions: '7',
    description: 'Master the techniques of drawing realistic pencil portraits.',
    thumbnail: '/pencil_portraiture.jpg',
    curriculum: [
      'Module 1: Understanding Anatomy and Proportion',
      'Module 2: Shading and Form',
      'Module 3: Facial Features in Detail',
      'Module 4: Hair and Clothing',
      'Module 5: Expressing Emotion',
    ],
  },
  {
    program: 'Basic Oil Painting',
    category: 'ARTS AND DESIGN',
    instructor: 'David Kim',
    date: 'November 10, 2025',
    time: '9:00 AM - 12:00 PM',
    sessions: '6',
    description: 'An introduction to oil painting techniques for beginners, covering color theory and brushwork.',
    thumbnail: '/oil_painting.jpg',
    curriculum: [
      'Module 1: Materials and Setup',
      'Module 2: Color Theory and Mixing',
      'Module 3: Basic Brushwork',
      'Module 4: Still Life Painting',
      'Module 5: Landscape Introduction',
    ],
  },
  {
    program: 'Hair and Make-up',
    category: 'ARTS AND DESIGN',
    instructor: 'Elena Rodriguez',
    date: 'December 2, 2025',
    time: '1:00 PM - 4:00 PM',
    sessions: '5',
    description: 'Learn fundamental hair styling and make-up application techniques for various occasions.',
    thumbnail: '/hair_makeup.jpg',
    curriculum: [
      'Module 1: Skin Prep and Foundation',
      'Module 2: Eye Makeup Techniques',
      'Module 3: Hair Styling Basics',
      'Module 4: Day to Night Looks',
      'Module 5: Special Occasion Styling',
    ],
  },
  {
    program: 'Acrylic Painting',
    category: 'ARTS AND DESIGN',
    instructor: 'Carlos Rivera',
    date: 'January 8, 2026',
    time: '10:00 AM - 1:00 PM',
    sessions: '6',
    description: 'Explore the vibrant world of acrylics, from abstract to realistic painting.',
    thumbnail: '/acrylic_painting.jpg',
    curriculum: [
      'Module 1: Acrylic Medium Introduction',
      'Module 2: Color Blending and Textures',
      'Module 3: Abstract Composition',
      'Module 4: Landscape Painting with Acrylics',
      'Module 5: Portrait Techniques',
    ],
  },
]

// Optional: export a utility to get program by name
export const getProgramByName = (name: string): Program | undefined =>
  programsList.find((p) => p.program.toLowerCase() === name.toLowerCase());