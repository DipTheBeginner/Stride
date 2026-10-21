"use client"

import { createContext, ReactNode, useContext } from "react";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
};

const WorkspaceContext = createContext<Workspace | null>(null);

type WorkspaceProviderProps = {
  workspace: Workspace;
  children: ReactNode;
};

export function WorkspaceProvider({
  workspace,
  children,
}: WorkspaceProviderProps) {
  return(
    <WorkspaceContext.Provider value={workspace}>
          {children}
        </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext);

  if (!workspace) {
      throw new Error("useWorkspace must be used within WorkspaceProvider");
    }
  
    return workspace;
}