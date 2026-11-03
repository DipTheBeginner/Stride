"use client";

import { Plus } from "lucide-react";
import CreateProjectModal from "../../../../components/projects/create-project-modal";
import { useState } from "react";
import ProjectCard from "../../../../components/projects/project-card";
import { useProjects } from "../../../../components/projects/projects-context";
import { usePathname, useRouter } from "next/navigation";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { projects } = useProjects()
  const pathname = usePathname()

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between p-6 rounded-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <h1 className="text-3xl">Turn ideas into real progress</h1>
          <p>Create organize and manage all your workspace projects.</p>
        </div>

        <button
          className="flex cursor-pointer gap-2 items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span className="text-lg ">New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
             onClick={() => router.push(`${pathname}/${project.id}`)}
          />
        ))}
      </div>

      {isModalOpen && (
        <CreateProjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
