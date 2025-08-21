import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Layout from '@/components/Layout';
import { getIndexInfo } from '@/sanity/lib/api';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'loicbacci.me',
  description: 'Personal Website of Loïc Baccigalupi',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const info = await getIndexInfo();

  if (!info) {
    return 'Invalid data';
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Layout headerInfo={info}>{children}</Layout>
        <SpeedInsights />
      </body>
    </html>
  );
}
