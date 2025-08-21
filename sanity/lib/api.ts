import { client } from '@/sanity/lib/client';
import { INDEX_INFO_QUERYResult } from '@/sanity/lib/types';
import { defineQuery } from 'next-sanity';

const INDEX_INFO_QUERY = defineQuery(
  '*[_type == "index-info"][0]{ name, content, links, profileImage }'
);

export const getIndexInfo = async () => {
  return await client.fetch<INDEX_INFO_QUERYResult>(INDEX_INFO_QUERY);
};
