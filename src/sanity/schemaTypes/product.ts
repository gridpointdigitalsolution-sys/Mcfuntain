import { defineType, defineField, defineArrayMember } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'pricing', title: 'Pricing' },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Images' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug (URL id)', type: 'slug', group: 'main', options: { source: 'name', maxLength: 64 }, validation: (r) => r.required() }),
    defineField({
      name: 'series', title: 'Series', type: 'string', group: 'main',
      options: { list: ['Cellular', 'Neuro', 'Metabolic', 'Mobility', 'Vision', 'Detox', 'Wellness'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'main' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'main' }),

    // Pricing — Single = 1 bottle, Premium = Pack of 3
    defineField({ name: 'singlePrice', title: 'Single Bottle Price ($)', type: 'number', group: 'pricing', validation: (r) => r.required().min(0) }),
    defineField({ name: 'premiumPrice', title: 'Premium 3-Pack Price ($)', type: 'number', group: 'pricing', validation: (r) => r.required().min(0) }),
    defineField({ name: 'capsuleCount', title: 'Default Capsule Count', type: 'number', group: 'pricing', initialValue: 120 }),
    defineField({
      name: 'bottleSizes', title: 'Bottle Sizes Offered (capsules)', type: 'array', group: 'pricing',
      of: [defineArrayMember({ type: 'number' })], options: { layout: 'tags' },
      description: 'e.g. 120, or 60 and 120 for both.',
    }),

    // Content
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'whyYouNeedIt', title: 'Why You Need It', type: 'text', rows: 6, group: 'content' }),
    defineField({ name: 'longDescription', title: 'Long Description', type: 'text', rows: 6, group: 'content' }),
    defineField({ name: 'benefits', title: 'Key Benefits', type: 'array', group: 'content', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'suitableFor', title: 'Suitable For', type: 'array', group: 'content', of: [defineArrayMember({ type: 'string' })] }),
    defineField({
      name: 'ingredients', title: 'Key Ingredients', type: 'array', group: 'content',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'latin', title: 'Latin Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'name', subtitle: 'latin' } },
      })],
    }),
    defineField({ name: 'directions', title: 'Directions', type: 'text', rows: 3, group: 'content' }),

    // Media
    defineField({ name: 'images', title: 'Bottle Images', type: 'array', group: 'media', of: [defineArrayMember({ type: 'image', options: { hotspot: true } })] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'series', media: 'images.0' },
  },
});
