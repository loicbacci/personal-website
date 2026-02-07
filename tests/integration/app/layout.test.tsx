import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import RootLayout from '@/app/layout';

const { getIndexInfo, draftMode } = vi.hoisted(() => ({
  getIndexInfo: vi.fn(),
  draftMode: vi.fn(),
}));

vi.mock('@/sanity/lib/api', () => ({
  getIndexInfo,
}));

vi.mock('next/headers', () => ({
  draftMode,
}));

vi.mock('@/components/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='layout-wrapper'>{children}</div>
  ),
}));

vi.mock('@/sanity/lib/live', () => ({
  SanityLive: () => <div data-testid='sanity-live' />,
}));

vi.mock('next-sanity', () => ({
  VisualEditing: () => <div data-testid='visual-editing' />,
}));

vi.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => null,
}));

vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

describe('app/layout integration', () => {
  it('always renders SanityLive and wraps children', async () => {
    getIndexInfo.mockResolvedValue(null);
    draftMode.mockResolvedValue({ isEnabled: false });

    const html = renderToStaticMarkup(
      await RootLayout({
        children: <div data-testid='content'>Content</div>,
      })
    );

    expect(html).toContain('data-testid=\"layout-wrapper\"');
    expect(html).toContain('data-testid=\"content\"');
    expect(html).toContain('data-testid=\"sanity-live\"');
    expect(html).not.toContain('data-testid=\"visual-editing\"');
  });

  it('renders VisualEditing when draft mode is enabled', async () => {
    getIndexInfo.mockResolvedValue(null);
    draftMode.mockResolvedValue({ isEnabled: true });

    const html = renderToStaticMarkup(
      await RootLayout({
        children: <div>Content</div>,
      })
    );

    expect(html).toContain('data-testid=\"visual-editing\"');
  });
});
