const MODULE = 8;
const GRID = 20;

function finderModules(gx: number, gy: number) {
  const rects: { x: number; y: number; size: number }[] = [];
  rects.push({ x: gx, y: gy, size: 7 });
  rects.push({ x: gx + 2, y: gy + 2, size: 3 });
  return rects;
}

const DATA_MODULES = [
  [9, 1], [11, 2], [15, 3], [17, 4], [9, 5], [12, 5],
  [2, 9], [5, 9], [9, 9], [11, 9], [14, 9], [17, 9],
  [1, 11], [4, 11], [9, 11], [12, 11], [16, 11], [18, 11],
  [9, 13], [11, 14], [15, 15], [9, 16], [12, 17], [17, 17],
  [2, 15], [5, 17], [1, 18], [4, 18],
];

export function PairingQrPlaceholder() {
  const finders = [
    ...finderModules(0, 0),
    ...finderModules(GRID - 7, 0),
    ...finderModules(0, GRID - 7),
  ];

  return (
    <svg
      viewBox={`0 0 ${GRID * MODULE} ${GRID * MODULE}`}
      width={160}
      height={160}
      role="img"
      aria-label="Decorative placeholder QR code"
      className="rounded-lg bg-white p-2"
    >
      {finders.map((r, i) => (
        <rect
          key={`f-${i}`}
          x={r.x * MODULE}
          y={r.y * MODULE}
          width={r.size * MODULE}
          height={r.size * MODULE}
          fill="#200E01"
        />
      ))}
      {DATA_MODULES.map(([gx, gy], i) => (
        <rect
          key={`d-${i}`}
          x={gx * MODULE}
          y={gy * MODULE}
          width={MODULE}
          height={MODULE}
          fill="#200E01"
        />
      ))}
    </svg>
  );
}
