import '../styles/globals.css';

export const metadata = {
  title: 'MySite Landing Page',
  description: 'Landing page with navbar using Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
