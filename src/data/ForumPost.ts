export interface ForumPost {
  id: string;
  title: string;
  subject: string;
  content: string;
  author: string;
  likes: number;
  commentCount: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: Date;
  parentCommentId?: string; // ✅ For nesting replies
}

export const dummyForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Welcome to the Floristry Program',
    subject: 'Floristry',
    content: 'Feel free to discuss flower arrangements and techniques here!',
    author: 'Instructor Jane',
    likes: 3,
    commentCount: 5,
    createdAt: new Date('2025-06-20T10:00:00'),
  },
  {
    id: '2',
    title: 'Culinary Arts Q&A',
    subject: 'Culinary Arts',
    content: 'Post your questions about cooking, baking, and culinary techniques.',
    author: 'Chef Alex',
    likes: 5,
    commentCount: 4,
    createdAt: new Date('2025-06-21T14:30:00'),
  },
  {
    id: '3',
    title: 'Barista Training Tips',
    subject: 'Barista Training',
    content: 'Discuss coffee brewing methods and latte art!',
    author: 'Barista Sam',
    likes: 2,
    commentCount: 1,
    createdAt: new Date('2025-06-22T09:15:00'),
  },
];

export const dummyComments: Comment[] = [
  // Floristry Post (Post ID 1)
  {
    id: 'c1',
    postId: '1',
    author: 'Student Anna',
    text: 'Thanks for creating this space!',
    createdAt: new Date('2025-06-20T12:00:00'),
  },
  {
    id: 'c2',
    postId: '1',
    author: 'Instructor Jane',
    text: 'Welcome Anna! Feel free to ask questions.',
    createdAt: new Date('2025-06-20T13:30:00'),
  },
  {
    id: 'c8',
    postId: '1',
    parentCommentId: 'c1',
    author: 'Student Mark',
    text: 'I agree! This is exciting.',
    createdAt: new Date('2025-06-20T14:00:00'),
  },
  {
    id: 'c9',
    postId: '1',
    parentCommentId: 'c8',
    author: 'Instructor Jane',
    text: 'Glad you’re excited!',
    createdAt: new Date('2025-06-20T15:00:00'),
  },
  {
    id: 'c10',
    postId: '1',
    parentCommentId: 'c9',
    author: 'Student Anna',
    text: 'Thank you Instructor Jane!',
    createdAt: new Date('2025-06-20T15:30:00'),
  },

  // Culinary Arts Post (Post ID 2)
  {
    id: 'c3',
    postId: '2',
    author: 'Student Mike',
    text: 'What’s the best way to bake a moist chocolate cake?',
    createdAt: new Date('2025-06-21T15:00:00'),
  },
  {
    id: 'c4',
    postId: '2',
    author: 'Chef Alex',
    text: 'Use buttermilk and don’t overmix the batter!',
    createdAt: new Date('2025-06-21T15:45:00'),
  },
  {
    id: 'c5',
    postId: '2',
    author: 'Student Sarah',
    text: 'Any beginner-friendly recipes for bread?',
    createdAt: new Date('2025-06-21T16:10:00'),
  },
  {
    id: 'c6',
    postId: '2',
    author: 'Chef Alex',
    text: 'Start with no-knead bread! Super easy for beginners.',
    createdAt: new Date('2025-06-21T16:45:00'),
  },

  // Barista Training Post (Post ID 3)
  {
    id: 'c7',
    postId: '3',
    author: 'Student Leo',
    text: 'What’s the right temperature for milk when doing latte art?',
    createdAt: new Date('2025-06-22T10:00:00'),
  },
];
