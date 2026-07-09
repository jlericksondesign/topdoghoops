const QR_VERSION = 5;
const QR_SIZE = 17 + QR_VERSION * 4;
const DATA_CODEWORDS = 108;
const ECC_CODEWORDS = 26;
const MODULE_SIZE = 5;
const QUIET_ZONE = 4;

type Cell = boolean | null;

type LocalQrCodeProps = {
  label: string;
  value: string;
};

function appendBits(bits: number[], value: number, length: number) {
  for (let index = length - 1; index >= 0; index -= 1) {
    bits.push((value >>> index) & 1);
  }
}

function getUtf8Bytes(value: string) {
  return Array.from(new TextEncoder().encode(value));
}

function gfMultiply(left: number, right: number) {
  let product = 0;

  for (let index = 0; index < 8; index += 1) {
    product ^= (right & 1) !== 0 ? left : 0;
    const carry = (left & 0x80) !== 0;
    left = (left << 1) & 0xff;
    left ^= carry ? 0x1d : 0;
    right >>>= 1;
  }

  return product;
}

function gfPow(value: number) {
  let result = 1;

  for (let index = 0; index < value; index += 1) {
    result = gfMultiply(result, 2);
  }

  return result;
}

function getGeneratorPolynomial(degree: number) {
  let coefficients = [1];

  for (let index = 0; index < degree; index += 1) {
    const next = new Array(coefficients.length + 1).fill(0) as number[];

    coefficients.forEach((coefficient, coefficientIndex) => {
      next[coefficientIndex] ^= coefficient;
      next[coefficientIndex + 1] ^= gfMultiply(coefficient, gfPow(index));
    });
    coefficients = next;
  }

  return coefficients;
}

function getErrorCorrectionCodewords(dataCodewords: number[]) {
  const generator = getGeneratorPolynomial(ECC_CODEWORDS);
  const remainder = new Array(ECC_CODEWORDS).fill(0) as number[];

  dataCodewords.forEach((codeword) => {
    const factor = codeword ^ (remainder.shift() ?? 0);
    remainder.push(0);

    for (let index = 0; index < ECC_CODEWORDS; index += 1) {
      remainder[index] ^= gfMultiply(generator[index + 1], factor);
    }
  });

  return remainder;
}

function createDataCodewords(value: string) {
  const bytes = getUtf8Bytes(value);

  if (bytes.length > 106) {
    throw new Error("QR value is too long for the MVP QR generator.");
  }

  const bits: number[] = [];
  appendBits(bits, 0b0100, 4);
  appendBits(bits, bytes.length, 8);
  bytes.forEach((byte) => appendBits(bits, byte, 8));
  appendBits(bits, 0, Math.min(4, DATA_CODEWORDS * 8 - bits.length));

  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const codewords: number[] = [];

  for (let index = 0; index < bits.length; index += 8) {
    codewords.push(Number.parseInt(bits.slice(index, index + 8).join(""), 2));
  }

  for (let index = 0; codewords.length < DATA_CODEWORDS; index += 1) {
    codewords.push(index % 2 === 0 ? 0xec : 0x11);
  }

  return codewords;
}

function createMatrix() {
  return Array.from({ length: QR_SIZE }, () =>
    new Array(QR_SIZE).fill(null),
  ) as Cell[][];
}

function setCell(matrix: Cell[][], x: number, y: number, value: boolean) {
  if (x >= 0 && y >= 0 && x < QR_SIZE && y < QR_SIZE) {
    matrix[y][x] = value;
  }
}

function drawFinder(matrix: Cell[][], x: number, y: number) {
  for (let dy = -1; dy <= 7; dy += 1) {
    for (let dx = -1; dx <= 7; dx += 1) {
      const xx = x + dx;
      const yy = y + dy;
      const isFinder =
        dx >= 0 &&
        dx <= 6 &&
        dy >= 0 &&
        dy <= 6 &&
        (dx === 0 ||
          dx === 6 ||
          dy === 0 ||
          dy === 6 ||
          (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));

      setCell(matrix, xx, yy, isFinder);
    }
  }
}

function drawAlignment(matrix: Cell[][], centerX: number, centerY: number) {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      setCell(
        matrix,
        centerX + dx,
        centerY + dy,
        Math.max(Math.abs(dx), Math.abs(dy)) !== 1,
      );
    }
  }
}

function drawFunctionPatterns(matrix: Cell[][]) {
  drawFinder(matrix, 0, 0);
  drawFinder(matrix, QR_SIZE - 7, 0);
  drawFinder(matrix, 0, QR_SIZE - 7);
  drawAlignment(matrix, 30, 30);

  for (let index = 8; index < QR_SIZE - 8; index += 1) {
    const value = index % 2 === 0;
    setCell(matrix, 6, index, value);
    setCell(matrix, index, 6, value);
  }

  setCell(matrix, 8, QR_SIZE - 8, true);
}

function getFormatBits() {
  const errorLevelLow = 1;
  const mask = 0;
  let data = (errorLevelLow << 3) | mask;
  let remainder = data << 10;
  const generator = 0x537;

  for (let index = 14; index >= 10; index -= 1) {
    if (((remainder >>> index) & 1) !== 0) {
      remainder ^= generator << (index - 10);
    }
  }

  return ((data << 10) | remainder) ^ 0x5412;
}

function getBit(value: number, index: number) {
  return ((value >>> index) & 1) !== 0;
}

function drawFormatBits(matrix: Cell[][]) {
  const bits = getFormatBits();

  for (let index = 0; index <= 5; index += 1) {
    setCell(matrix, 8, index, getBit(bits, index));
  }

  setCell(matrix, 8, 7, getBit(bits, 6));
  setCell(matrix, 8, 8, getBit(bits, 7));
  setCell(matrix, 7, 8, getBit(bits, 8));

  for (let index = 9; index < 15; index += 1) {
    setCell(matrix, 14 - index, 8, getBit(bits, index));
  }

  for (let index = 0; index < 8; index += 1) {
    setCell(matrix, QR_SIZE - 1 - index, 8, getBit(bits, index));
  }

  for (let index = 8; index < 15; index += 1) {
    setCell(matrix, 8, QR_SIZE - 15 + index, getBit(bits, index));
  }
}

function shouldMask(x: number, y: number) {
  return (x + y) % 2 === 0;
}

function drawData(matrix: Cell[][], codewords: number[]) {
  const bits = codewords.flatMap((codeword) => {
    const codewordBits: number[] = [];
    appendBits(codewordBits, codeword, 8);
    return codewordBits;
  });
  let bitIndex = 0;
  let direction = -1;

  for (let right = QR_SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) {
      right -= 1;
    }

    for (
      let y = direction === -1 ? QR_SIZE - 1 : 0;
      y >= 0 && y < QR_SIZE;
      y += direction
    ) {
      for (let column = 0; column < 2; column += 1) {
        const x = right - column;

        if (matrix[y][x] !== null) {
          continue;
        }

        const rawBit = bitIndex < bits.length ? bits[bitIndex] === 1 : false;
        matrix[y][x] = shouldMask(x, y) ? !rawBit : rawBit;
        bitIndex += 1;
      }
    }

    direction = -direction;
  }
}

function createQrMatrix(value: string) {
  const dataCodewords = createDataCodewords(value);
  const matrix = createMatrix();
  drawFunctionPatterns(matrix);
  drawData(matrix, [
    ...dataCodewords,
    ...getErrorCorrectionCodewords(dataCodewords),
  ]);
  drawFormatBits(matrix);
  return matrix;
}

export function LocalQrCode({ label, value }: LocalQrCodeProps) {
  const matrix = createQrMatrix(value);
  const size = (QR_SIZE + QUIET_ZONE * 2) * MODULE_SIZE;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={180}
      height={180}
      role="img"
      aria-label={label}
      className="rounded-lg bg-white p-2"
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      {matrix.flatMap((row, y) =>
        row.flatMap((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={(x + QUIET_ZONE) * MODULE_SIZE}
              y={(y + QUIET_ZONE) * MODULE_SIZE}
              width={MODULE_SIZE}
              height={MODULE_SIZE}
              fill="#200E01"
            />
          ) : (
            []
          ),
        ),
      )}
    </svg>
  );
}
