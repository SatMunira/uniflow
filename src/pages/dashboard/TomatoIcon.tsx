export function TomatoIcon({ className = "" }: { className?: string }) {
  // плоский «помидор» в нашем стиле: чёрные линии, пастельная заливка
  return (
    <svg viewBox="0 0 128 96" className={className} aria-hidden>
      <defs>
        <filter id="noise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" type="fractalNoise" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.05" />
          </feComponentTransfer>
        </filter>
      </defs>
      {/* листочки */}
      <path d="M64 18c6-8 14-10 22-8-8 5-10 12-9 16M64 18c-6-8-14-10-22-8 8 5 10 12 9 16"
        fill="#b8e6a1" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      {/* плод */}
      <ellipse cx="64" cy="56" rx="46" ry="34" fill="#ffb3c6" stroke="#000" strokeWidth="2" />
      {/* блеск */}
      <ellipse cx="48" cy="46" rx="10" ry="6" fill="#fff" opacity=".35" />
      {/* шумок как в ваших карточках */}
      <rect x="10" y="20" width="108" height="72" fill="transparent" filter="url(#noise)" />
    </svg>
  );
}
