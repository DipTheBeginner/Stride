"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { useWorkspace } from "../workspace/workspace-context";




export type Project = {
  id: string,
  name: string,
  workspaceId: string
  description: string | null
  status: "PLANNED" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
}

type ProjectsContextValue = {
  projects: Project[];
  refreshProjects: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

type projectsProviderProps = {
  
  children:ReactNode
}



export function ProjectsProvider({ children }: projectsProviderProps) {

  

  const { slug } = useWorkspace();



  const [projects, setProjects] = useState<Project[]>([])

  const refreshProjects = useCallback(async () => {
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
     void refreshProjects();
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
      throw new Error("useProject must be used within ProjectsProvider");
    }
  
    return context;
}