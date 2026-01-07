import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/lib/providers/query-provider';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Smart Local Business - Find & Book Local Services',
  description:
    'Discover and book local businesses and services in your area. Connect with verified providers for all your needs.',
  keywords: ['local business', 'booking', 'services', 'directory', 'reviews'],
  authors: [{ name: 'Smart Local Business Team' }],
  openGraph: {
    title: 'Smart Local Business - Find & Book Local Services',
    description: 'Discover and book local businesses and services in your area.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
