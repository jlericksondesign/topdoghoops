"use client";

import { ChevronDown } from "lucide-react";

const DIVISIONS = [
  "Overall",
  "Boys Elementary",
  "Boys Middle School",
  "Girls Elementary",
  "Girls Middle School",
];

type DivisionSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DivisionSelect({ value, onChange }: DivisionSelectProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-lg border-2 border-canton-ink bg-canton-teal px-4 py-3 text-sm font-bold text-canton-ink focus:outline-none"
      >
        {DIVISIONS.map((division) => (
          <option key={division} value={division}>
            {division}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-canton-ink"
        aria-hidden
      />
    </div>
  );
}
