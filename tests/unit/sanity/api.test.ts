import { describe, expect, it, vi } from 'vitest';

type LoadApiOptions = {
  hasConfig: boolean;
  fetchData?: unknown;
};

const loadApi = async ({ hasConfig, fetchData = null }: LoadApiOptions) => {
  vi.resetModules();

  const sanityFetch = vi.fn().mockResolvedValue({ data: fetchData });

  vi.doMock('@/sanity/env', () => ({
    hasSanityConfig: hasConfig,
  }));

  vi.doMock('@/sanity/lib/live', () => ({
    sanityFetch,
  }));

  const api = await import('@/sanity/lib/api');

  return { api, sanityFetch };
};

describe('sanity/lib/api', () => {
  it('returns fallback values when Sanity config is missing', async () => {
    const { api, sanityFetch } = await loadApi({ hasConfig: false });

    await expect(api.getIndexInfo()).resolves.toBeNull();
    await expect(api.getAllProjectsInfo()).resolves.toEqual([]);
    await expect(api.getAllProjectSlugs()).resolves.toEqual([]);
    await expect(api.getProject('any')).resolves.toBeNull();
    await expect(api.getProjectTitle('any')).resolves.toBeNull();

    expect(sanityFetch).not.toHaveBeenCalled();
  });

  it('fetches project slugs with published perspective and stega disabled', async () => {
    const slugs = [{ slug: 'one' }, { slug: 'two' }];
    const { api, sanityFetch } = await loadApi({
      hasConfig: true,
      fetchData: slugs,
    });

    await expect(api.getAllProjectSlugs()).resolves.toEqual(slugs);
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        perspective: 'published',
        stega: false,
      })
    );
  });

  it('fetches project title with slug param and stega disabled', async () => {
    const { api, sanityFetch } = await loadApi({
      hasConfig: true,
      fetchData: { title: 'My project' },
    });

    await expect(api.getProjectTitle('my-project')).resolves.toEqual({
      title: 'My project',
    });

    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { slug: 'my-project' },
        stega: false,
      })
    );
  });

  it('fetches a project with slug param', async () => {
    const project = { title: 'Project', body: [], links: [] };
    const { api, sanityFetch } = await loadApi({
      hasConfig: true,
      fetchData: project,
    });

    await expect(api.getProject('project')).resolves.toEqual(project);
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { slug: 'project' },
      })
    );
  });

  it('fetches home and list queries when config is present', async () => {
    const info = {
      name: 'Loic',
      content: [],
      links: [],
      profileImage: { asset: null, hotspot: null, crop: null, alt: 'Profile' },
    };

    const { api, sanityFetch } = await loadApi({
      hasConfig: true,
      fetchData: info,
    });

    await expect(api.getIndexInfo()).resolves.toEqual(info);
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({ query: expect.any(String) })
    );
  });
});
