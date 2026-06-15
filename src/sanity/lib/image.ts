import imageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({ projectId, dataset });

// Derive the image source type from the builder to avoid depending on an
// internal package path that varies between @sanity/image-url versions.
type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
