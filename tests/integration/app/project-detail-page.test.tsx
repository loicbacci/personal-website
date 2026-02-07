import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/projects/[slug]/page';

const { getAllProjectSlugs, getProject, getProjectTitle, notFound } =
  vi.hoisted(() => ({
    getAllProjectSlugs: vi.fn(),
    getProject: vi.fn(),
    getProjectTitle: vi.fn(),
    notFound: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND');
    }),
  }));

vi.mock('@/sanity/lib/api', () => ({
  getAllProjectSlugs,
  getProject,
  getProjectTitle,
}));

vi.mock('next/navigation', () => ({
  notFound,
}));

vi.mock('@/components/portableText', () => ({
  default: () => <div data-testid='portable-text'>Portable text body</div>,
}));

vi.mock('lucide-react/dynamic', () => ({
  DynamicIcon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

vi.mock('lucide-react/dynamicIconImports', () => ({
  default: {
    github: vi.fn(),
  },
}));

describe('app/projects/[slug]/page integration', () => {
  it('returns static params from Sanity slug query', async () => {
    getAllProjectSlugs.mockResolvedValue([{ slug: 'alpha' }, { slug: 'beta' }]);

    await expect(generateStaticParams()).resolves.toEqual([
      { slug: 'alpha' },
      { slug: 'beta' },
    ]);
  });

  it('falls back metadata title to slug when title is missing', async () => {
    getProjectTitle.mockResolvedValue(null);

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: 'my-slug' }) })
    ).resolves.toEqual({ title: 'my-slug' });
  });

  it('calls notFound for unknown project', async () => {
    getProject.mockResolvedValue(null);

    await expect(
      ProjectPage({ params: Promise.resolve({ slug: 'missing' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND');

    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it('renders project content and links when project exists', async () => {
    getProject.mockResolvedValue({
      title: 'Project Z',
      body: [],
      links: [
        {
          _key: 'github',
          _type: 'link',
          title: 'GitHub',
          url: 'https://github.com/project-z',
          inHeader: false,
          icon: 'github',
        },
      ],
    });

    render(await ProjectPage({ params: Promise.resolve({ slug: 'project-z' }) }));

    expect(screen.getByRole('heading', { name: 'Project Z' })).toBeInTheDocument();
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/project-z'
    );
  });
});
