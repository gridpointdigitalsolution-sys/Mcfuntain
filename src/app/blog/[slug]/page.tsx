import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Check, Clock } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { blogPosts, type BlogPost } from '@/data/blog';

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article Not Found | McFuntain Nutraceuticals' };
  }

  return {
    title: `${post.title} | McFuntain Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Rev. Dr. Gideon Afolabi'],
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Related posts — others, capped at 3
  const related: BlogPost[] = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    url: `https://mcfuntain.com/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mcfuntain.com/blog/${post.slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Rev. Dr. Gideon Afolabi',
    },
    publisher: {
      '@type': 'Organization',
      name: 'McFuntain Nutraceuticals',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mcfuntain.com/images/brand/logo-dark.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={post.title}
        eyebrow={post.category}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
        bottleSlug="longevity-30"
      />

      <article className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          {/* meta row */}
          <div className="mb-10 flex flex-wrap items-center gap-5 border-b border-beige-dark/50 pb-7 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" />
              {post.readMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-navy">
              By Rev. Dr. Gideon Afolabi
            </span>
          </div>

          {/* content blocks */}
          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={i}
                    className="pt-4 font-heading text-2xl font-bold uppercase leading-snug text-navy sm:text-3xl"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'ul') {
                return (
                  <ul key={i} className="space-y-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15">
                          <Check className="h-3 w-3 text-gold-deep" strokeWidth={3} />
                        </span>
                        <span className="text-[16px] leading-relaxed text-ink/80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }

              // paragraph — italic styling for the trailing disclaimer (starts with *)
              const isDisclaimer = block.text.startsWith('*');
              return (
                <p
                  key={i}
                  className={
                    isDisclaimer
                      ? 'mt-10 border-t border-beige-dark/50 pt-6 text-sm italic leading-relaxed text-muted'
                      : 'text-[17px] leading-relaxed text-ink/80'
                  }
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* back to journal */}
          <div className="mt-12 border-t border-beige-dark/50 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-navy transition-colors duration-300 hover:text-gold-deep"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>
          </div>
        </div>
      </article>

      {/* related posts */}
      {related.length > 0 && (
        <section className="bg-beige py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
              Keep Reading
            </p>
            <h2 className="mb-10 font-heading text-3xl font-bold uppercase text-navy sm:text-4xl">
              More from the Journal
            </h2>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-beige-dark/40 bg-white p-7 shadow-[0_14px_34px_-26px_rgba(27,42,74,0.45)] transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_26px_50px_-26px_rgba(27,42,74,0.45)]"
                >
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-gold/12 px-3.5 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    {rp.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold uppercase leading-snug text-navy transition-colors duration-300 group-hover:text-gold-deep">
                    {rp.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                    {rp.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold uppercase tracking-wider text-navy transition-all duration-300 group-hover:gap-2.5 group-hover:text-gold-deep">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
