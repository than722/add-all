// app/layout.tsx
import type { Metadata } from 'next';
import '@/styles/globals.css'; 
import Navbar from '@/components/ui/navbar/Navbar'; 

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
        {/* Your Navbar component */}
        <Navbar />
        {/* The children prop will render your page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}