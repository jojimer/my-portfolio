import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Joji | WebApp Developer',
  description: 'Portfolio website for Joji, a WebApp Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      style={{ colorScheme: 'dark' }}
      className={`${spaceGrotesk.variable} overflow-x-hidden`}
    >
      <head>
        <meta name="grammarly" content="off" />
      </head>
      <body className={`${spaceGrotesk.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}