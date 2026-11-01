
"use client";

import {
  ChevronDown,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "../../../../components/projects/create-project-modal";
import ProjectCard from "../../../../components/projects/project-card";
import { useProjects } from "../../../../components/projects/projects-context";
import ProjectSidebar from "../../../../components/projects/project-sidebar";
import NoProjectSelected from "../../../../components/projects/no-project-selected";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const { projects } = useProjects();

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <div className="flex flex-col p-6 h-full min-h-0 overflow-hidden">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F7F8F8]">
            Projects
          </h1>
          <p className="text-sm text-[#8A8F98]">
            Manage and organize your workspace projects
          </p>
        </div>
        <button
          className="bg-blue-600 flex items-center p-4 rounded-lg gap-4 justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Plus />
          <span>New Project</span>
        </button>
      </div>

      <div className="mx-4 my-2 border-b border-white/10 mt-6" />

      <div className="grid grid-cols-[minmax(0,7fr)_minmax(320px,3fr)] gap-5 min-h-0 flex-1 overflow-hidden">
        {/* Project list */}

        <div className="flex flex-col min-h-0 min-w-0 ">
          <div className="p-2">
            <div className="flex gap-2">
              <div className="flex w-80 items-center gap-2 rounded-lg bg-[#0F1316] px-4 py-2 focus-within:ring-1 focus-within:ring-blue-500">
                <Search size={18} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search project"
                  className="min-w-0 flex-1 bg-transparent outline-none"
                />
              </div>

              <div className="flex gap-2 p-2 rounded-lg bg-[#0F1316]">
                <span>All Statuses</span>
                <ChevronDown />
              </div>

              <div className="flex gap-2 p-2 rounded-lg bg-[#0F1316]">
                <span>Sort by: Recent</span>
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className="mt-2 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-3 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)]">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={project.id === selectedProjectId}
                onClick={() => setSelectedProjectId(project.id)}
              />
            ))}
          </div>
        </div>

        {/* Right-side panel */}

        {selectedProject ? (
          <ProjectSidebar project={selectedProject} />
        ) : (
          <NoProjectSelected />
        )}
      </div>

      {isOpen && <CreateProjectModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
