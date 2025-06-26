// src/data/AnnouncementsData.ts

export interface Announcement {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  content: string;
  category: 'News' | 'Event' | 'Update' | 'Maintenance';
}

export const dummyAnnouncements: Announcement[] = [
  {
    id: 'announcement-1',
    title: 'New Program Launched: Digital Photography Basics!',
    date: '2025-06-25',
    content: 'We are thrilled to announce the launch of our new Digital Photography Basics program! Learn the fundamentals of photography, from camera settings to composition. Enroll now to secure your spot!',
    category: 'News',
  },
  {
    id: 'announcement-2',
    title: 'Website Maintenance Scheduled for July 1st',
    date: '2025-06-20',
    content: 'Please be advised that our website will undergo scheduled maintenance on July 1st, 2025, from 2:00 AM to 4:00 AM PST. During this time, the website may be temporarily unavailable. We apologize for any inconvenience.',
    category: 'Maintenance',
  },
  {
    id: 'announcement-3',
    title: 'Annual Art Exhibition: Call for Submissions!',
    date: '2025-06-15',
    content: 'Our annual student art exhibition is approaching! We invite all enrolled students to submit their artwork for display. Submission deadline is July 30th. Check your email for more details.',
    category: 'Event',
  },
  {
    id: 'announcement-4',
    title: 'Updated Privacy Policy Effective June 1st',
    date: '2025-05-28',
    content: 'We have updated our Privacy Policy to enhance your data security and clarify our practices. Please take a moment to review the new policy on our About Us page. Your continued use of our services constitutes acceptance of these changes.',
    category: 'Update',
  },
  {
    id: 'announcement-5',
    title: 'Guest Lecture: "Mastering Watercolor" on July 10th',
    date: '2025-06-10',
    content: 'Join us for a special online guest lecture by renowned    artist Maria Clara on "Mastering Watercolor Techniques." This event is open to all students and instructors. Date: July 10th, 6:00 PM PST. Registration details will be sent via email.',
    category: 'Event',
  },
];
