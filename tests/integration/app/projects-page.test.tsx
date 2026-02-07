import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Projects from '@/app/projects/page';

const { getAllProjectsInfo } = vi.hoisted(() => ({
  getAllProjectsInfo: vi.fn(),
}));

vi.mock('@/sanity/lib/api', () => ({
  getAllProjectsInfo,
}));

describe('app/projects/page integration', () => {
  it('renders fallback message when no projects are available', async () => {
    getAllProjectsInfo.mockResolvedValue([]);

    render(await Projects());

    expect(screen.getByText('No projects published yet.')).toBeInTheDocument();
  });

  it('renders project cards when projects exist', async () => {
    getAllProjectsInfo.mockResolvedValue([
      {
        slug: 'project-a',
        title: 'Project A',
        description: 'A description',
        _updatedAt: '2025-01-01',
      },
    ]);

    render(await Projects());

    expect(screen.getByRole('link', { name: /project a/i })).toHaveAttribute(
      'href',
      '/projects/project-a'
    );
  });
});
