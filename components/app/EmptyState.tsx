import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-canton-callout px-6 py-10 text-center">
      <Icon className="h-8 w-8 text-canton-green" aria-hidden />
      <p className="text-lg font-bold text-canton-ink">{title}</p>
      <p className="text-sm text-canton-callout-text">{description}</p>
    </div>
  );
}
