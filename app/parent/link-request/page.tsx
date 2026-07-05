import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { MagicLinkRequestForm } from "@/components/features/auth/MagicLinkRequestForm";

export default function ParentLinkRequestPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/family" />
      <div className="flex flex-1 flex-col px-10 pb-10 pt-12">
        <MagicLinkRequestForm />
      </div>
    </main>
  );
}
