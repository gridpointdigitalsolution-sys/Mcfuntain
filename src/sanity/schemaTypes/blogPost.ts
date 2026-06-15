import { defineType, defineField, defineArrayMember } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'readMinutes', title: 'Read Minutes', type: 'number' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      description: 'Full article content.',
    }),
  ],
  orderings: [
    { title: 'Date, newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
});
