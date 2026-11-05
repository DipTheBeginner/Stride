"use client";

import type { ProjectPriority, ProjectStatus } from "./project-config";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWorkspace } from "../workspace/workspace-context";

export type Project = {
  id: string;
  name: string;
  workspaceId: string;
  description: string | null;
  status: ProjectStatus;
  icon: string;
  color: string;
  priority: ProjectPriority;
  tags: string[];
  startDate: string;
  dueDate: string;

  members: {
    userId: string;
    role: "LEAD" | "MEMBER";
    user: {
      id: string;
      name: string;
      imageUrl: string | null;
    };
  }[];
};

type ProjectsContextValue = {
  projects: Project[];
  refreshProjects: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

type projectsProviderProps = {
  children: ReactNode;
};

export function ProjectsProvider({ children }: projectsProviderProps) {
  const { slug } = useWorkspace();

  const [projects, setProjects] = useState<Project[]>([]);

  const refreshProjects = useCallback(async () => {
    if (!slug) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/workspace/${encodeURIComponent(slug)}/projects`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setProjects(data.projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, [slug]);

  useEffect(() => {
    async function loadProjects() {
      await refreshProjects();
    }
  
    void loadProjects();
  }, [refreshProjects]);

  return (
    <ProjectsContext.Provider value={{ projects, refreshProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }

  return context;
}
