import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProjectList from '@/components/ProjectsList';

describe('ProjectsList', () => {
  it('renders all projects and links to each project page', () => {
    render(
      <ProjectList
        projectsInfo={[
          {
            slug: 'alpha',
            title: 'Alpha',
            description: 'Alpha description',
            _updatedAt: '2025-01-01',
          },
          {
            slug: 'beta',
            title: 'Beta',
            description: 'Beta description',
            _updatedAt: '2025-01-02',
          },
        ]}
      />
    );

    expect(screen.getByRole('link', { name: /alpha/i })).toHaveAttribute(
      'href',
      '/projects/alpha'
    );
    expect(screen.getByRole('link', { name: /beta/i })).toHaveAttribute(
      'href',
      '/projects/beta'
    );
  });

  it('renders empty grid when there are no projects', () => {
    const { container } = render(<ProjectList projectsInfo={[]} />);

    expect(container.querySelectorAll('a')).toHaveLength(0);
  });
});
