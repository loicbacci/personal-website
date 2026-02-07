import {
  INDEX_INFO_QUERYResult,
  PROJECT_QUERYResult,
  PROJECT_SLUGS_QUERYResult,
  PROJECT_TITLE_QUERYResult,
  PROJECTS_INFO_QUERYResult,
} from '@/sanity/lib/types';
import { defineQuery } from 'next-sanity';
import { hasSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/lib/live';

const INDEX_INFO_QUERY = defineQuery(
  '*[_type == "index-info"][0]{ name, content, links, profileImage{asset, hotspot, crop, alt} }'
);

const PROJECTS_INFO_QUERY = defineQuery(
  '*[_type == "project" && defined(slug.current)] | order(_updatedAt desc) { "slug": slug.current, title, description, _updatedAt }'
);
const PROJECT_SLUGS_QUERY = defineQuery(
  '*[_type == "project" && defined(slug.current)]{ "slug": slug.current }'
);

const PROJECT_TITLE_QUERY = defineQuery(
  '*[_type == "project" && slug.current == $slug][0]{ title }'
);

const PROJECT_QUERY = defineQuery(
  '*[_type == "project" && slug.current == $slug][0]{ title, body, links }'
);

export const getAllProjectSlugs = async () => {
  if (!hasSanityConfig) {
    return [];
  }
  const { data } = await sanityFetch({
    query: PROJECT_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data satisfies PROJECT_SLUGS_QUERYResult;
};

export const getProjectTitle = async (slug: string) => {
  if (!hasSanityConfig) {
    return null;
  }
  const { data } = await sanityFetch({
    query: PROJECT_TITLE_QUERY,
    params: { slug },
    stega: false,
  });

  return data satisfies PROJECT_TITLE_QUERYResult;
};

export const getProject = async (slug: string) => {
  if (!hasSanityConfig) {
    return null;
  }
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  return data satisfies PROJECT_QUERYResult;
};

export const getIndexInfo = async () => {
  if (!hasSanityConfig) {
    return null;
  }
  const { data } = await sanityFetch({
    query: INDEX_INFO_QUERY,
  });

  return data satisfies INDEX_INFO_QUERYResult;
};

export const getAllProjectsInfo = async () => {
  if (!hasSanityConfig) {
    return [];
  }
  const { data } = await sanityFetch({
    query: PROJECTS_INFO_QUERY,
  });

  return data satisfies PROJECTS_INFO_QUERYResult;
};
