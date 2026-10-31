import Image from "next/image";
import { Project } from "./projects-context";
import { projectIcons } from "./project-icons";
import { Folder } from "lucide-react";



type ProjectSidebarProps = {
  project: Project;
}

export default function ProjectSidebar({ project }: ProjectSidebarProps) {

  const Icon = projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  return (

    <div>
     
      <div className="flex">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${project.color}20` }}
        >
          <Icon size={25} style={{ color: project.color }} />
        </div>
        
      </div>

      
    </div>

    

    
  )
}