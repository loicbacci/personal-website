import { type SchemaTypeDefinition } from 'sanity';
import { projectType } from '@/sanity/schemaTypes/projectType';
import { linkType } from '@/sanity/schemaTypes/linkType';
import { indexInfoType } from '@/sanity/schemaTypes/indexInfoType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, linkType, indexInfoType],
};
