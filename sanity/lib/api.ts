import { client } from '@/sanity/lib/client';
import {
  INDEX_INFO_QUERYResult,
  PROJECT_QUERYResult,
  PROJECT_SLUGS_QUERYResult,
  PROJECT_TITLE_QUERYResult,
  PROJECTS_INFO_QUERYResult,
} from '@/sanity/lib/types';
import { defineQuery } from 'next-sanity';

const INDEX_INFO_QUERY = defineQuery(
  '*[_type == "index-info"][0]{ name, content, links, profileImage }'
);

const PROJECTS_INFO_QUERY = defineQuery(
  '*[_type == "project"] | order(_updatedAt) { "slug": slug.current, title, description, _updatedAt }'
);
const PROJECT_SLUGS_QUERY = defineQuery(
  '*[_type == "project"]{ "slug": slug.current }'
);

const PROJECT_TITLE_QUERY = defineQuery(
  '*[_type == "project" && slug.current == $slug][0]{ title }'
);

const PROJECT_QUERY = defineQuery(
  '*[_type == "project" && slug.current == $slug][0]'
);

export const getAllProjectSlugs = async () => {
  return await client.fetch<PROJECT_SLUGS_QUERYResult>(PROJECT_SLUGS_QUERY);
};

export const getProjectTitle = async (slug: string) => {
  return await client.fetch<PROJECT_TITLE_QUERYResult>(PROJECT_TITLE_QUERY, {
    slug,
  });
};

export const getProject = async (slug: string) => {
  return await client.fetch<PROJECT_QUERYResult>(PROJECT_QUERY, { slug });
};

export const getIndexInfo = async () => {
  return await client.fetch<INDEX_INFO_QUERYResult>(INDEX_INFO_QUERY);
};

export const getAllProjectsInfo = async () => {
  return await client.fetch<PROJECTS_INFO_QUERYResult>(PROJECTS_INFO_QUERY);
};
