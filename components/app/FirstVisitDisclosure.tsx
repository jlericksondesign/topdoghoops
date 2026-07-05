"use client";

import { type ReactNode, useEffect, useState } from "react";

type FirstVisitDisclosureProps = {
  children: ReactNode;
  storageKey: string;
  title: string;
};

export function FirstVisitDisclosure({
  children,
  storageKey,
  title,
}: FirstVisitDisclosureProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setShouldShow(window.localStorage.getItem(storageKey) !== "agreed");
  }, [storageKey]);

  function handleAgree() {
    window.localStorage.setItem(storageKey, "agreed");
    setShouldShow(false);
  }

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-canton-ink/55 px-6">
      <section className="w-full max-w-sm overflow-hidden rounded-2xl border-2 border-canton-ink bg-white">
        <div className="bg-canton-green px-5 py-4">
          <h2 className="text-lg font-black uppercase tracking-wide text-white">
            {title}
          </h2>
        </div>
        <div className="grid gap-5 px-5 py-5">
          <div className="text-sm font-semibold leading-6 text-canton-muted">
            {children}
          </div>
          <button
            type="button"
            onClick={handleAgree}
            className="rounded-2xl bg-canton-green px-4 py-3 text-sm font-black uppercase tracking-wide text-white"
          >
            I Agree
          </button>
        </div>
      </section>
    </div>
  );
}
