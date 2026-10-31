"use client";

import { BookOpen, ChevronDown, Folder, MousePointer, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import CreateProjectModal from "../../../../components/projects/create-project-modal";
import ProjectCard from "../../../../components/projects/project-card";
import { useProjects } from "../../../../components/projects/projects-context";
import ProjectStatCard from "../../../../components/projects/project-stat-card";
import Image from "next/image";
import ProjectSidebar from "../../../../components/projects/project-sidebar";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  const { projects } = useProjects();

  return (
    <div className="flex flex-col p-6 h-full min-h-0 overflow-hidden">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">Projects</span>
          <span className="text-md text-slate-500">
            Manage and oraganize your workspace projects
          </span>
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

      <div className="grid grid-cols-[minmax(0,8fr)_minmax(320px,2fr)] gap-5 min-h-0 flex-1 overflow-hidden">
        {/*right*/}

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

          <div className="flex flex-col min-h-0 flex-1 overflow-y-auto gap-4 mt-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        {/*left*/}

        <div className="flex flex-col h-full items-center justify-center bg-[#101318] gap-2 rounded-lg">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full bg-[#111720]" />

            <div className="absolute flex h-28 w-28 items-center justify-center rounded-full bg-[#161E2B]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1C2635]">
                <Folder size={42} strokeWidth={2} className="text-purple-400" />
              </div>
            </div>

            <Plus
              size={15}
              strokeWidth={2.5}
              className="absolute left-1 top-5 text-purple-500"
            />

            <Plus
              size={15}
              strokeWidth={2.5}
              className="absolute bottom-5 right-1 text-purple-500"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <span className="text-2xl font-semibold">No project selected</span>
            <p className="max-w-xs text-center text-sm leading-6 text-gray-400">
              Choose a project from the list to view its details, manage
              settings, and track progress.
            </p>

            <div className="w-64 mt-6 border-b border-white/10" />

            <div className="gap-8 flex flex-col">
              <div className="flex gap-3 items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10">
                  <MousePointer
                    size={20}
                    strokeWidth={1.8}
                    className="text-purple-400"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <span>Click on any project</span>
                  <p className="text-sm text-gray-400">
                    Open its details on the right
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                  <BookOpen
                    size={20}
                    strokeWidth={1.8}
                    className="text-blue-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span>View key information</span>
                  <p className="text-sm text-gray-400">
                    status, members, timeline and more
                  </p>
                </div>
              </div>


              <div className="flex gap-3 items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                  <SlidersHorizontal
                    size={20}
                    strokeWidth={1.8}
                    className="text-emerald-400"
                  />
                </div>  
                <div className="flex flex-col gap-1">
                  <span>Manage and edit</span>
                  <p className="text-sm text-gray-400">
                    Update project details and settings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <CreateProjectModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
