import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'McFuntain Nutraceuticals - Nature Refined for Better Living';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1A1A',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gold accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #A88012, #D4A017, #E5B838, #D4A017, #A88012)',
          }}
        />

        {/* Decorative gold diamond */}
        <div
          style={{
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, #A88012, #D4A017, #E5B838)',
            borderRadius: '4px 20px 4px 20px',
            transform: 'rotate(45deg)',
            marginBottom: 40,
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#FAFAFA',
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          McFuntain Nutraceuticals
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#D4A017',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Nature Refined for Better Living
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4A017, transparent)',
            marginBottom: 24,
          }}
        />

        {/* Sub-tagline */}
        <div
          style={{
            fontSize: 20,
            color: '#9A9A9A',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          26 Premium Botanical Supplements
        </div>

        {/* Bottom gold accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #A88012, #D4A017, #E5B838, #D4A017, #A88012)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
