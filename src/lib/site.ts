/**
 * The site's canonical origin.
 *
 * mcfuntain.com 308-redirects to www.mcfuntain.com, so www is the URL that is
 * actually served and the one every canonical, sitemap entry and structured-data
 * id must name. Pointing search engines at the redirecting host wastes crawl
 * budget and splits signals between two hostnames.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mcfuntain.com').replace(/\/$/, '');
