import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B2A4A, #1A1A1A)',
          borderRadius: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold "M" — matches the brand logo monogram */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            fontFamily: 'serif',
            background: 'linear-gradient(180deg, #E5B838, #D4A017, #A88012)',
            backgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1,
            marginTop: -1,
            letterSpacing: -1,
          }}
        >
          M
        </div>
        {/* Small blue water drop accent (matching logo's blue element) */}
        <div
          style={{
            position: 'absolute',
            bottom: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 6,
            background: 'linear-gradient(180deg, #3B6EB5, #1B4A8A)',
            borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
