import { defineField, defineType } from 'sanity';

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      title: 'Link text',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'In Header',
      name: 'inHeader',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'lucide-icon',
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
    }),
  ],
});
