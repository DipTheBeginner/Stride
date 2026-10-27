"use client";

import { ChevronDown, Plus, Search } from "lucide-react";
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
          <span className="text-md text-slate-500">
            Manage and oraganize your workspace projects
          </span>
        </div>
        <button className="bg-blue-600 flex items-center p-4 rounded-lg gap-4 justify-center"
          onClick={()=>setIsOpen(true)}>
          <Plus />
          <span>New Project</span>
        </button>
      </div>

      <div className="mt-8">
        <ProjectStatCard />
      </div>
      <div className="mx-4 my-2 border-b border-white/10 mt-6" />

      <div className="mt-4 flex gap-4">
        <div className="flex border rounded-lg bg-[#101315] items-center p-3 gap-4">
          <Search size={20} />
          <input type="text" placeholder="Search projects..." />
        </div>
        <div className="border rounded-lg p-2 flex items-center gap-2">
          <span>All Statuses</span>
          <ChevronDown size={15} />
        </div>
        <div className="flex border rounded-lg items-center gap-6 p-2">
          <span>Sort by:Recent</span>
          <ChevronDown size={15} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {
        isOpen && (
          <CreateProjectModal onClose={()=>setIsOpen(false)}/>
        )
      }
    </div>
  );
}
