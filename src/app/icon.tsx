import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

// McFuntain brand favicon — navy tile, gold ring, gold "M" monogram + chalice drop.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(140deg, #22345B 0%, #1B2A4A 50%, #0E1730 100%)',
          borderRadius: 14,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* gold ring border */}
        <div
          style={{
            position: 'absolute',
            inset: 3,
            borderRadius: 11,
            border: '2px solid rgba(212,160,23,0.55)',
          }}
        />
        {/* gold "M" monogram */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            fontFamily: 'Georgia, "Times New Roman", serif',
            background: 'linear-gradient(180deg, #F0CB63 0%, #E5B838 40%, #D4A017 70%, #A88012 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1,
            marginTop: -4,
            letterSpacing: -2,
          }}
        >
          M
        </div>
        {/* blue chalice drop accent (matches the brand emblem) */}
        <div
          style={{
            position: 'absolute',
            bottom: 9,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 8,
            height: 12,
            background: 'linear-gradient(180deg, #4C82CC, #1B4A8A)',
            borderRadius: '50% 50% 50% 50% / 35% 35% 65% 65%',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
