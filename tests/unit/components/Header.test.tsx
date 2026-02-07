import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';

const { usePathname } = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname,
}));

vi.mock('@/sanity/lib/image', () => ({
  urlFor: vi.fn(() => ({
    url: () => 'https://cdn.sanity.io/images/project/profile.jpg',
  })),
}));

vi.mock('@/components/portableText', () => ({
  default: () => <div data-testid='portable-text'>Portable text</div>,
}));

vi.mock('lucide-react/dynamic', () => ({
  DynamicIcon: ({ name }: { name: string }) => (
    <span data-testid={`icon-${name}`}>icon</span>
  ),
}));

vi.mock('lucide-react/dynamicIconImports', () => ({
  default: {
    github: vi.fn(),
    linkedin: vi.fn(),
  },
}));

const baseInfo = {
  name: 'Loic Baccigalupi',
  content: [],
  profileImage: {
    asset: null,
    hotspot: null,
    crop: null,
    alt: 'Profile image alt',
  },
  links: [
    {
      _key: 'one',
      _type: 'link',
      title: 'GitHub',
      url: 'https://github.com/user',
      inHeader: true,
      icon: 'github',
    },
    {
      _key: 'two',
      _type: 'link',
      title: 'Portfolio',
      url: 'https://example.com',
      inHeader: false,
      icon: 'linkedin',
    },
  ],
};

describe('Header', () => {
  beforeEach(() => {
    usePathname.mockReset();
  });

  it('renders site name as heading on home route', () => {
    usePathname.mockReturnValue('/');

    render(<Header info={baseInfo as any} />);

    expect(
      screen.getByRole('heading', { name: /loic baccigalupi/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /loic baccigalupi/i })).toBeNull();
  });

  it('renders site name as link away from home route', () => {
    usePathname.mockReturnValue('/projects');

    render(<Header info={baseInfo as any} />);

    expect(screen.getByRole('link', { name: /loic baccigalupi/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders only header links and keeps accessible labels', () => {
    usePathname.mockReturnValue('/');

    render(<Header info={baseInfo as any} />);

    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /portfolio/i })).toBeNull();
  });

  it('falls back to computed profile alt text when alt is blank', () => {
    usePathname.mockReturnValue('/');

    const noAltInfo = {
      ...baseInfo,
      profileImage: {
        ...baseInfo.profileImage,
        alt: '',
      },
    };

    render(<Header info={noAltInfo as any} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      'Profile picture of Loic Baccigalupi'
    );
  });
});
