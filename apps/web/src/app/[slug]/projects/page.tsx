"use client"

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "../../../../components/projects/create-project-modal";
import ProjectCard from "../../../../components/projects/project-card";
import { useProjects } from "../../../../components/projects/projects-context";
import ProjectStatCard from "../../../../components/projects/project-stat-card";




export default function Projects() {

  const [isOpen, setIsOpen] = useState(false);

  const { projects } = useProjects();
  
  
  return (

    <div className="flex flex-col p-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Projects</span>
          <span className="text-md text-slate-500">Manage and oraganize your workspace projects</span>
        </div>
        <button className="bg-blue-600 flex items-center p-4 rounded-lg gap-4 justify-center">
          <Plus />
          <span>New Project</span>
        </button>
      </div>

      <div>
        <ProjectStatCard/>
      </div>
    </div>
 
    
  )
}