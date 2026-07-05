import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="min-h-dvh bg-background px-4 py-6">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5">
        <Button asChild variant="ghost" className="w-fit px-2">
          <Link href="/player">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Player Dashboard
          </Link>
        </Button>

        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Top Dog Hoops
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-tight">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </section>
    </main>
  );
}
