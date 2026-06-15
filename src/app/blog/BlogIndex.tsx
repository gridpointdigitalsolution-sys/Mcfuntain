'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { blogPosts as localBlogPosts, type BlogPost } from '@/data/blog';

const EASE = [0.22, 1, 0.36, 1] as const;

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: EASE }}
      className="group h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col rounded-2xl border border-beige-dark/40 bg-white p-7 shadow-[0_14px_34px_-26px_rgba(27,42,74,0.45)] transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_26px_50px_-26px_rgba(27,42,74,0.45)]"
      >
        {/* category pill */}
        <span className="mb-5 inline-flex w-fit items-center rounded-full bg-gold/12 px-3.5 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          {post.category}
        </span>

        {/* title */}
        <h2 className="font-heading text-2xl font-bold uppercase leading-snug text-navy transition-colors duration-300 group-hover:text-gold-deep">
          {post.title}
        </h2>

        {/* excerpt */}
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
          {post.excerpt}
        </p>

        {/* meta */}
        <div className="mt-6 flex items-center gap-4 border-t border-beige-dark/40 pt-5 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" />
            {post.readMinutes} min read
          </span>
        </div>

        {/* read more */}
        <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold uppercase tracking-wider text-navy transition-all duration-300 group-hover:gap-2.5 group-hover:text-gold-deep">
          Read More
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.article>
  );
}

export default function BlogIndex({ posts = localBlogPosts }: { posts?: BlogPost[] }) {
  return (
    <>
      <PageHero
        title="Journal"
        eyebrow="Insights & Wisdom"
        subtitle="Where traditional African herbal wisdom meets modern botanical science. Practical guidance, honest education, and the thinking behind every McFuntain formulation."
        bottleSlug="longevity-30"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
