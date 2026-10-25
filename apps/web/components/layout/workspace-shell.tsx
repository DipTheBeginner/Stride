"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./sidebar";

import { WorkspaceProvider } from "../workspace/workspace-context";
import { ProjectsProvider } from "../projects/projects-context";
import Image from "next/image";

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
  const [userImage, setUserImage] = useState<string | null>(null);

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

    void fetchWorkspace();

    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          credentials: "include",
        },
      );
  
      if (!response.ok) return;
  
      const data = await response.json();
  
      console.log("Logged-in user:", data);
      setUserImage(data.user?.imageUrl ?? null);
    }
  
    void fetchUser();
  }, []);

  if (loading) {
    return <div>Loading workspace...</div>;
  }

  if (!workspace) {
    return <div>Workspace not found or access denied</div>;
  }

  return (
    <WorkspaceProvider workspace={workspace}>
      <ProjectsProvider>
        <div className="flex min-h-screen w-full">
          <aside className="w-[20%] shrink-0 border-r border-[#363943]">
            <Sidebar />
          </aside>

          <div className="flex flex-1 flex-col min-w-0">
            <header className=" flex h-16 items-center shrink-0 justify-center border-b border-[#363943]">
              Search bar
              <div>
                {userImage ? (
                  <Image
                    src={userImage}
                    alt="User profile"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span>No profile image</span>
                )}
              </div>
            </header>

            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </ProjectsProvider>
    </WorkspaceProvider>
  );
}
