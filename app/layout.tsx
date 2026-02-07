import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Layout from '@/components/Layout';
import { getIndexInfo } from '@/sanity/lib/api';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

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
  const { isEnabled } = await draftMode();

  return (
    <html lang='en'>
      <body>
        <Layout headerInfo={info}>{children}</Layout>
        <SanityLive />
        {isEnabled && <VisualEditing />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
