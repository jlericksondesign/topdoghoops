"use client";

import {
  INVITE_CSV_TEMPLATE,
  getValidInviteRows,
  parseInviteCsv,
  type InviteCsvPreviewRow,
} from "@/lib/invite-csv";
import { type ChangeEvent, useMemo, useState } from "react";

function getRowLabel(row: InviteCsvPreviewRow) {
  return (
    row.normalized?.player_first_name ??
    row.values.player_first_name ??
    `Row ${row.rowNumber}`
  );
}

export function InviteCsvImportClient() {
  const [csvText, setCsvText] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rows = useMemo(() => parseInviteCsv(csvText), [csvText]);
  const validRows = getValidInviteRows(rows);
  const invalidRows = rows.filter((row) => row.errors.length > 0);
  const canImport = validRows.length > 0 && invalidRows.length === 0;

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage(null);
    setError(null);
    setCsvText(await file.text());
  }

  async function handleImport() {
    setIsImporting(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/admin/api/import-invites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invites: validRows,
        }),
      });

      const result = (await response.json()) as {
        imported?: number;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "The import did not work.");
      }

      setCsvText("");
      setMessage(`${result.imported ?? 0} draft invite(s) created.`);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The import did not work.",
      );
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border-2 border-canton-ink bg-white">
      <div className="bg-canton-green px-4 py-3">
        <p className="text-sm font-black uppercase tracking-widest text-white">
          CSV Import
        </p>
      </div>
      <div className="flex flex-col gap-5 px-4 py-5">
        <div className="flex flex-col gap-3">
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              INVITE_CSV_TEMPLATE,
            )}`}
            download="top-dog-hoops-invite-template.csv"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-canton-pill px-4 text-sm font-black uppercase text-canton-ink"
          >
            Download Template
          </a>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
              Upload CSV
            </span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 py-3 text-sm font-bold text-canton-ink"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
              Or Paste CSV
            </span>
            <textarea
              value={csvText}
              onChange={(event) => {
                setMessage(null);
                setError(null);
                setCsvText(event.target.value);
              }}
              placeholder={INVITE_CSV_TEMPLATE}
              rows={8}
              className="rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 py-3 text-sm font-bold leading-6 text-canton-ink outline-none focus:border-canton-green"
            />
          </label>
        </div>

        {message ? (
          <p className="rounded-xl bg-canton-green px-4 py-3 text-sm font-black uppercase text-white">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-xl bg-canton-orange px-4 py-3 text-sm font-black uppercase text-white">
            {error}
          </p>
        ) : null}

        {rows.length > 0 ? (
          <div className="rounded-xl border-2 border-canton-cream-line bg-canton-cream px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-black text-canton-ink">
                  {validRows.length} Ready
                </p>
                <p className="text-sm font-bold text-canton-muted">
                  {invalidRows.length} need fixes
                </p>
              </div>
              <button
                type="button"
                disabled={!canImport || isImporting}
                onClick={handleImport}
                className="h-12 rounded-xl bg-canton-green px-4 text-sm font-black uppercase text-white disabled:cursor-not-allowed disabled:bg-canton-pill disabled:text-canton-muted"
              >
                {isImporting ? "Importing" : "Create Drafts"}
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {rows.slice(0, 10).map((row) => (
                <article
                  key={`${row.rowNumber}-${getRowLabel(row)}`}
                  className="rounded-xl bg-white px-3 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-canton-ink">
                        {getRowLabel(row)}{" "}
                        {row.normalized?.player_last_initial
                          ? `${row.normalized.player_last_initial}.`
                          : ""}
                      </p>
                      <p className="mt-1 text-xs font-bold text-canton-muted">
                        Row {row.rowNumber} ·{" "}
                        {row.normalized?.parent_email ??
                          row.values.parent_email ??
                          "No email"}
                      </p>
                    </div>
                    <span className="rounded-full bg-canton-pill px-3 py-1 text-xs font-black uppercase text-canton-ink">
                      {row.errors.length === 0 ? "Ready" : "Fix"}
                    </span>
                  </div>
                  {row.errors.length > 0 ? (
                    <ul className="mt-2 flex flex-col gap-1">
                      {row.errors.map((rowError) => (
                        <li
                          key={rowError}
                          className="text-xs font-bold text-canton-orange"
                        >
                          {rowError}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>

            {rows.length > 10 ? (
              <p className="mt-3 text-xs font-bold text-canton-muted">
                Showing first 10 rows only.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
