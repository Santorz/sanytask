import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/cn-utils';
import { ThemeProvider } from '@/components/general/theme-provider';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--monty-font',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sanytask',
    default: 'Sanytask',
  },
  description: 'A personalized task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen w-full bg-background monty-font antialiased',
          montserrat.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='m-0 p-0 w-full'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
