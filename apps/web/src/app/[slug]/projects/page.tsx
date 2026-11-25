"use client";

import { Check, Plus, Search } from "lucide-react";
import CreateProjectModal from "../../../../components/projects/create-project-modal";
import { useState } from "react";
import ProjectCard from "../../../../components/projects/project-card";
import { useProjects } from "../../../../components/projects/projects-context";
import { usePathname, useRouter } from "next/navigation";
import { Span } from "next/dist/trace";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const { projects } = useProjects();
  const pathname = usePathname();

  const router = useRouter();

  const filters = [
    { label: "All Projects", color: null },
    { label: "Active", color: "bg-emerald-500" },
    { label: "Planned", color: "bg-zinc-500" },
    { label: "On Hold", color: "bg-amber-500" },
    { label: "Completed", color: null },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-2">
      <div className="flex items-center justify-between rounded-xl
        border border-[#29292D] bg-[#18181B] p-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[28px] font-semibold tracking-tight text-zinc-100">
            Projects
          </h1>

          <p className="text-sm font-normal  text-zinc-400">
            Create, organize, and manage all your workspace projects.
          </p>
        </div>

        <button
          className="flex h-12 cursor-pointer items-center gap-2
            rounded-lg border border-[#36363B] bg-[#27272B] px-4
            text-sm font-medium text-zinc-200
            transition-colors duration-200
            hover:border-[#45454B] hover:bg-[#323237] hover:text-white
            active:bg-[#27272B]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={17} strokeWidth={1.8} />
          <span>New Project</span>
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex w-fit items-center gap-1 rounded-xl
          border border-[#29292D] bg-[#18181B] p-1">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              aria-pressed={activeFilter === filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex h-10 w-32 cursor-pointer items-center
                    justify-center gap-2 rounded-lg text-sm font-medium
                    transition-all duration-200 active:scale-[0.97]
                    ${
                      activeFilter === filter.label
                      ? "bg-[#2C2C31] text-zinc-100"
                          : "text-zinc-400 hover:bg-[#232327] hover:text-zinc-100"
                    }`}
            >
              {filter.color && (
                <span className={`h-2 w-2 rounded-full ${filter.color}`} />
              )}
              {filter.label === "Completed" && <Check size={15} />}

              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="flex h-12 w-64 items-center gap-2 rounded-xl
          border border-[#29292D] bg-[#18181B] px-3
          transition-colors duration-200
          hover:border-[#3D3D44] focus-within:border-zinc-500">
        
          <Search size={17} className="shrink-0 text-zinc-500" />
        
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-transparent text-sm text-zinc-200
              outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="mt-2 min-h-0 flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-3 gap-4 p-1">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => router.push(`${pathname}/${project.id}`)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CreateProjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
