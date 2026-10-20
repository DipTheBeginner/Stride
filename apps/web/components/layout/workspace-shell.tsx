"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./sidebar";

type Workspace = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
};

export default function WorkspaceShell({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkspace() {
      try {
        setLoading(true);
        setWorkspace(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${encodeURIComponent(slug)}`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch workspace: ${response.status}`);
        }

        const data = await response.json();
        if (!controller.signal.aborted) {
          setWorkspace(data.workspace);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchWorkspace();

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return <div>Loading workspace...</div>;
  }

  if (!workspace) {
    return <div>Workspace not found or access denied</div>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside className="w-[20%] shrink-0 border-r border-[#363943]">
        <Sidebar workspace={workspace} />
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className=" flex h-16 items-center shrink-0 justify-center border-b border-[#363943]">
          Search bar
        </header>

        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
