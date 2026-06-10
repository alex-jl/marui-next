import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Feed } from "@/components/layout/Feed";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import { Tooltip } from "@/components/ui/Tooltip";
import { Timestamp } from "@/components/ui/Timestamp";
import { getCurrentUser, getConnections, getPendingRequests, getSentRequests } from "@/app/lib/queries";
import { acceptConnection, declineRequest, cancelRequest } from "@/app/lib/actions";

export const metadata: Metadata = { title: "Circle" };

interface CirclePageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function CirclePage({ searchParams }: CirclePageProps) {
  const { tab } = await searchParams;
  const activeTab = tab === "requests" ? "requests" : "connections";

  const currentUser = await getCurrentUser();
  if (!currentUser) notFound();

  const [connections, pendingRequests, sentRequests] = await Promise.all([
    getConnections(currentUser.id),
    getPendingRequests(currentUser.id),
    getSentRequests(currentUser.id),
  ]);

  return (
    <Feed>
      <Tabs
        tabs={[
          { label: "Connections", href: "/circle", active: activeTab === "connections" },
          { label: `Requests${pendingRequests.length > 0 ? ` (${pendingRequests.length})` : ""}`, href: "/circle?tab=requests", active: activeTab === "requests" },
        ]}
      />

      {activeTab === "connections" && (
        <div className="bg-card border border-steel-light/50 rounded p-5 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-ink">{connections.length} / 100</p>
            <p className="text-xs text-steel-dark">spots remaining: {100 - connections.length}</p>
          </div>

          <div className="grid grid-cols-10 gap-2 justify-items-center">
            {connections.map((user) => (
              <Tooltip key={user.id} content={user.name}>
                <Link href={`/user/${user.id}`} className="aspect-square">
                  <Avatar
                    src={user.avatar_url ?? undefined}
                    alt={user.name}
                    initials={user.name.slice(0, 2)}
                    size="sm"
                  />
                </Link>
              </Tooltip>
            ))}
            {Array.from({ length: 100 - connections.length }).map((_, i) => (
              <div
                key={i}
                className="aspect-square w-8 h-8 rounded-full border border-dashed border-steel-light/70"
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <>
          {pendingRequests.length > 0 && (
            <p className="text-xs font-semibold text-steel-dark uppercase tracking-wider px-1">
              Received
            </p>
          )}
          {pendingRequests.map((req) => (
            <div key={req.connection_id} className="bg-card border border-steel-light/50 rounded p-4 flex items-center gap-3">
              <Link href={`/user/${req.id}`} className="shrink-0">
                <Avatar src={req.avatar_url ?? undefined} alt={req.name} initials={req.name.slice(0, 2)} size="md" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/user/${req.id}`} className="text-sm font-semibold text-ink hover:underline truncate block">
                  {req.name}
                </Link>
                <p className="text-xs text-steel-dark">
                  Requested <Timestamp unix={Math.floor(new Date(req.created_at).getTime() / 1000)} />
                </p>
              </div>
              <div className="flex items-center gap-1">
                <form action={declineRequest.bind(null, req.connection_id)}>
                  <button className="text-sm font-medium px-3 py-1.5 rounded text-steel-dark hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer">
                    Decline
                  </button>
                </form>
                <form action={acceptConnection.bind(null, req.connection_id)}>
                  <button className="text-sm font-medium px-3 py-1.5 rounded text-granite hover:bg-granite/10 transition-colors cursor-pointer">
                    Accept
                  </button>
                </form>
              </div>
            </div>
          ))}
          {pendingRequests.length === 0 && sentRequests.length === 0 && (
            <p className="text-center text-sm text-steel-dark py-8">No pending requests.</p>
          )}

          {sentRequests.length > 0 && (
            <>
              <p className="text-xs font-semibold text-steel-dark uppercase tracking-wider px-1 mt-2">
                Sent
              </p>
              {sentRequests.map((req) => (
                <div key={req.connection_id} className="bg-card border border-steel-light/50 rounded p-4 flex items-center gap-3">
                  <Link href={`/user/${req.id}`} className="shrink-0">
                    <Avatar src={req.avatar_url ?? undefined} alt={req.name} initials={req.name.slice(0, 2)} size="md" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/user/${req.id}`} className="text-sm font-semibold text-ink hover:underline truncate block">
                      {req.name}
                    </Link>
                    <p className="text-xs text-steel-dark">
                      Sent <Timestamp unix={Math.floor(new Date(req.created_at).getTime() / 1000)} />
                    </p>
                  </div>
                  <form action={cancelRequest.bind(null, req.connection_id)}>
                    <button className="text-sm font-medium px-3 py-1.5 rounded text-steel-dark hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer">
                      Cancel
                    </button>
                  </form>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </Feed>
  );
}
