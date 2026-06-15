// Sanity environment. projectId/dataset are PUBLIC (they ship in the client bundle).
// Hardcoded fallbacks so builds work even before env vars are set in the host.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ft2jd7j7';
