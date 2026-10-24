"use client"

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "../../../../components/projects/create-project-modal";
import ProjectCard from "../../../../components/projects/project-card";
import { useProjects } from "../../../../components/projects/projects-context";




export default function Projects() {

  const [isOpen, setIsOpen] = useState(false);

  const {projects} = useProjects();

  return (

    <div className=" flex flex-col p-6 min-h-screen">
      <div className="flex justify-between">
        <div className="flex flex-col">
          
        <div className="text-3xl font-bold">Projects</div>
        <span className=" text-[#8A8F98]">Manage and organize your workspace projects</span>
        <div>
          boxes
        </div>
        </div>
        <button onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#4F54E7] flex">
          <Plus/>
          <span>New project</span>
        </button>
        
      </div>
      <div className="flex" >
        <div className="flex flex-col">
          <div>
            <div>Search bar</div>
            <div>statuses</div>
            <div>sort by</div>
            <div>view type</div>
          </div>
          <div className="">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <div>
          project overview
        </div>
      </div>
      {
        isOpen && <CreateProjectModal onClose={() => setIsOpen(false)}/>
      }
    </div>
    
  )
}