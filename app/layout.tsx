import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Provider } from '@/components/ui/provider';

export const metadata: Metadata = {
  title: 'loicbacci.me',
  description: 'Personal Website of Loïc Baccigalupi',
};

// Setup chakra theme
// const config = defineConfig({
//   theme: {},
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
