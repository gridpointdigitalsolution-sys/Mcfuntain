import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'McFuntain Nutraceuticals Journal';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const title = post?.title ?? 'McFuntain Journal';
  const category = post?.category ?? 'Insights & Wisdom';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #1B2A4A 0%, #14213c 55%, #0e1730 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #A88012, #D4A017, #E5B838, #D4A017, #A88012)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #A88012, #E5B838)', borderRadius: '4px 14px 4px 14px', transform: 'rotate(45deg)' }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: '#FAFAFA', letterSpacing: '-0.5px' }}>McFuntain Nutraceuticals</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 24, color: '#D4A017', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24 }}>{category}</div>
          <div style={{ fontSize: title.length > 60 ? 56 : 68, fontWeight: 700, color: '#FAFAFA', lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 90, height: 2, background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          <div style={{ fontSize: 22, color: '#9FB0CC', letterSpacing: '2px', textTransform: 'uppercase' }}>The McFuntain Journal</div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #A88012, #D4A017, #E5B838, #D4A017, #A88012)' }} />
      </div>
    ),
    { ...size },
  );
}
