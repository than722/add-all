// app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/ui/navbar/Navbar';
import { AuthProvider } from '@/components/contexts/authContext'; // Import your AuthProvider

export const metadata: Metadata = {
  title: 'Ateneo de Davao Academy of Lifelong Learning',
  description: 'Providing lifelong learning opportunities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap your entire application with AuthProvider */}
        <AuthProvider>
          <Navbar /> {/* Navbar now gets its role from context */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}