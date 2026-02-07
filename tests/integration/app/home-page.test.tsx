import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from '@/app/page';

const { getIndexInfo, getAllProjectsInfo } = vi.hoisted(() => ({
  getIndexInfo: vi.fn(),
  getAllProjectsInfo: vi.fn(),
}));

vi.mock('@/sanity/lib/api', () => ({
  getIndexInfo,
  getAllProjectsInfo,
}));

vi.mock('lucide-react/dynamic', () => ({
  DynamicIcon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

vi.mock('lucide-react/dynamicIconImports', () => ({
  default: {
    github: vi.fn(),
  },
}));

describe('app/page integration', () => {
  it('renders projects and links sections when data exists', async () => {
    getAllProjectsInfo.mockResolvedValue([
      {
        slug: 'my-project',
        title: 'My Project',
        description: 'Description',
        _updatedAt: '2025-01-01',
      },
    ]);
    getIndexInfo.mockResolvedValue({
      name: 'Loic',
      content: [],
      profileImage: { asset: null, hotspot: null, crop: null, alt: 'Profile' },
      links: [
        {
          _key: 'github',
          _type: 'link',
          title: 'GitHub',
          url: 'https://github.com/test',
          inHeader: false,
          icon: 'github',
        },
      ],
    });

    render(await Home());

    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my project/i })).toHaveAttribute(
      'href',
      '/projects/my-project'
    );
    expect(screen.getByRole('heading', { name: 'Links' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/test'
    );
  });

  it('does not render links section when index links are absent', async () => {
    getAllProjectsInfo.mockResolvedValue([]);
    getIndexInfo.mockResolvedValue(null);

    render(await Home());

    expect(screen.queryByRole('heading', { name: 'Links' })).toBeNull();
  });
});
