export type InviteCsvInput = {
  parent_email: string;
  parent_name: string;
  player_first_name: string;
  player_last_initial: string;
  grade: number;
  division:
    | "boys_elementary"
    | "boys_middle_school"
    | "girls_elementary"
    | "girls_middle_school";
};

export type InviteCsvPreviewRow = {
  rowNumber: number;
  values: Partial<Record<keyof InviteCsvInput, string>>;
  normalized: InviteCsvInput | null;
  errors: string[];
};

export const INVITE_CSV_HEADERS = [
  "parent_email",
  "parent_name",
  "player_first_name",
  "player_last_initial",
  "grade",
  "division",
] as const;

export const INVITE_CSV_TEMPLATE = `${INVITE_CSV_HEADERS.join(",")}
parent@example.com,Test Parent,Maceo,23,5,boys_elementary
`;

const validDivisions = [
  "boys_elementary",
  "boys_middle_school",
  "girls_elementary",
  "girls_middle_school",
];

function parseCsvLine(line: string) {
  const values: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      currentValue += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (character === "," && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = "";
      continue;
    }

    currentValue += character;
  }

  values.push(currentValue.trim());
  return values;
}

function normalizeCsvText(csvText: string) {
  return csvText
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeHeader(header: string) {
  return header.trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeDivision(value: string) {
  return value.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");
}

export function deriveGenderFromDivision(
  division: InviteCsvInput["division"],
) {
  return division.startsWith("girls_") ? "girl" : "boy";
}

function validateRow(
  rowNumber: number,
  values: Partial<Record<keyof InviteCsvInput, string>>,
): InviteCsvPreviewRow {
  const errors: string[] = [];
  const parentEmail = values.parent_email?.trim().toLowerCase() ?? "";
  const parentName = values.parent_name?.trim() ?? "";
  const playerFirstName = values.player_first_name?.trim() ?? "";
  const playerLastInitial = values.player_last_initial?.trim() ?? "";
  const gradeValue = values.grade?.trim() ?? "";
  const division = normalizeDivision(values.division ?? "");
  const grade = Number.parseInt(gradeValue, 10);

  if (!parentEmail || !isEmail(parentEmail)) {
    errors.push("Parent email is required.");
  }

  if (!playerFirstName) {
    errors.push("Player first name is required.");
  }

  if (!playerLastInitial) {
    errors.push("Player last initial is required.");
  }

  if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
    errors.push("Grade must be a number from 1 to 12.");
  }

  if (!validDivisions.includes(division)) {
    errors.push("Division is not recognized.");
  }

  return {
    rowNumber,
    values,
    normalized:
      errors.length === 0
        ? {
            parent_email: parentEmail,
            parent_name: parentName,
            player_first_name: playerFirstName,
            player_last_initial: playerLastInitial.slice(0, 3),
            grade,
            division: division as InviteCsvInput["division"],
          }
        : null,
    errors,
  };
}

export function parseInviteCsv(csvText: string): InviteCsvPreviewRow[] {
  const lines = normalizeCsvText(csvText);

  if (lines.length === 0) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);
  const missingHeaders = INVITE_CSV_HEADERS.filter(
    (header) => !headers.includes(header),
  );

  if (missingHeaders.length > 0) {
    return [
      {
        rowNumber: 1,
        values: {},
        normalized: null,
        errors: [`Missing columns: ${missingHeaders.join(", ")}.`],
      },
    ];
  }

  return lines.slice(1).map((line, index) => {
    const rowValues = parseCsvLine(line);
    const values = INVITE_CSV_HEADERS.reduce<
      Partial<Record<keyof InviteCsvInput, string>>
    >((result, header) => {
      const columnIndex = headers.indexOf(header);
      result[header] = rowValues[columnIndex] ?? "";
      return result;
    }, {});

    return validateRow(index + 2, values);
  });
}

export function getValidInviteRows(rows: InviteCsvPreviewRow[]) {
  return rows.flatMap((row) => (row.normalized ? [row.normalized] : []));
}
