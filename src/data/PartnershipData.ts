export interface Partner {
  title: string;
  description: string;
  image: string; // Image URL or path
}

export const partnershipData: Partner[] = [
  {
    title: 'Ateneo de Davao University',
    description: 'ADDU is our core academic partner, supporting lifelong learning programs for the community.',
    image: '/addu logo.png',
  },
  {
    title: 'Local Business Chamber',
    description: 'Collaborating on business and finance courses for entrepreneurs and professionals.',
    image: '/addu logo.png',
  },
  {
    title: 'Art and Culture Council',
    description: 'Partnering on arts and cultural workshops to promote creativity and heritage appreciation.',
    image: '/addu logo.png',
  },
  {
    title: 'Community Garden Initiative',
    description: 'Working together to provide training on urban gardening and sustainability projects.',
    image: '/addu logo.png',
  },
];
