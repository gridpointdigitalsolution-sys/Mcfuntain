import type { SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { blogPost } from './blogPost';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, blogPost],
};
