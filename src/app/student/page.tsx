import { redirect } from 'next/navigation'; // Import Next.js's redirect utility

export default function StudentRootPage() {
  // When a user navigates directly to /student, they will be automatically redirected
  // to the /student/allprograms page. This ensures a clean URL and a default view.
  redirect('/student/allprograms');

  // Note: No JSX is returned here because the redirect happens before rendering.
}