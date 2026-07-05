"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

type CreateInviteResponse = {
  error?: string;
};

export function SingleInviteForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("saving");
    setMessage(null);

    const formData = new FormData(form);

    try {
      const response = await fetch("/admin/api/invites", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as CreateInviteResponse;

      if (!response.ok) {
        throw new Error(result.error ?? "Invite could not be created.");
      }

      form.reset();
      setStatus("saved");
      setMessage("Draft invite created.");
      router.refresh();
    } catch (caughtError) {
      setStatus("error");
      setMessage(
        caughtError instanceof Error
          ? caughtError.message
          : "Invite could not be created.",
      );
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage(null);
          setStatus("idle");
          setIsOpen(true);
        }}
        className="inline-flex h-12 items-center justify-center rounded-xl bg-canton-green px-4 text-sm font-black uppercase tracking-wide text-white"
      >
        Add Single Invite
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-canton-ink/55 px-5 py-8">
          <section className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-canton-ink bg-white">
            <div className="flex items-center justify-between gap-3 bg-canton-green px-4 py-3">
              <p className="text-sm font-black uppercase tracking-widest text-white">
                Add Single Invite
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3 px-4 py-5">
              <label className="grid gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                  Parent Email
                </span>
                <input
                  required
                  type="email"
                  name="parent_email"
                  className="h-11 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                  Parent Name
                </span>
                <input
                  name="parent_name"
                  className="h-11 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1">
                  <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                    Player First
                  </span>
                  <input
                    required
                    name="player_first_name"
                    className="h-11 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                    Last Initial
                  </span>
                  <input
                    required
                    name="player_last_initial"
                    className="h-11 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                  />
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                  Grade
                </span>
                <input
                  required
                  min={1}
                  max={12}
                  type="number"
                  name="grade"
                  className="h-11 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                  Division
                </span>
                <select
                  required
                  name="division"
                  className="h-11 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-3 text-sm font-bold text-canton-ink outline-none focus:border-canton-green"
                >
                  <option value="boys_elementary">Boys Elementary</option>
                  <option value="boys_middle_school">Boys Middle School</option>
                  <option value="girls_elementary">Girls Elementary</option>
                  <option value="girls_middle_school">Girls Middle School</option>
                </select>
              </label>

              <button
                type="submit"
                disabled={status === "saving"}
                className="mt-2 h-12 rounded-xl bg-canton-green px-4 text-sm font-black uppercase tracking-wide text-white disabled:bg-canton-pill disabled:text-canton-muted"
              >
                {status === "saving" ? "Creating" : "Create Draft Invite"}
              </button>

              {message ? (
                <p
                  className={`text-xs font-black uppercase ${
                    status === "error"
                      ? "text-canton-orange"
                      : "text-canton-green"
                  }`}
                >
                  {message}
                </p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
