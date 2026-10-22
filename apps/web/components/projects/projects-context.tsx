import { createContext, ReactNode, useContext, useState } from "react"




export type Project = {
  id: string,
  name: string,
  workspaceId:string
}

type ProjectsContextValue = {
  projects: Project[];
  refreshProjects: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

type projectsProviderProps = {
  
  children:ReactNode
}

export function ProjectsProvider({ projects, children }: projectsProviderProps) {

  const [getProjects , setGetProjects] = useState<Project[]>([])


  return (

    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  )
  
}

export function useProject() {
  const projects = useContext(ProjectsContext);

  if (!projects) {
      throw new Error("useProject must be used within ProjectsProvider");
    }
  
    return projects;
}