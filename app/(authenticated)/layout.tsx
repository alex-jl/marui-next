import { NavBar } from "@/components/layout/NavBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { ComposerProvider } from "@/components/post/ComposerProvider";
import { getCurrentUser } from "@/app/lib/queries";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen bg-surface">
      <NavBar />
      <ComposerProvider
        name={currentUser?.name ?? ""}
        avatarSrc={currentUser?.avatar_url ?? undefined}
      >
        {children}
        <BottomNav />
      </ComposerProvider>
    </div>
  );
}
