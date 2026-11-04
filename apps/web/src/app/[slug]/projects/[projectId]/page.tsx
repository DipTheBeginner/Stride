"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays, Flag, Folder } from "lucide-react";

import type { Project } from "../../../../../components/projects/projects-context";
import { getProjectById } from "@/services/project.services";
import { projectIcons } from "../../../../../components/projects/project-icons";
import {
  statusConfig,
  priorityConfig,
} from "../../../../../components/projects/project-config";
import UserAvatar from "../../../../../components/ui/user-avatra";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const projectMembers = project?.members.slice(0, 5);

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      setLoading(true);
      setError(null);
      setProject(null);

      try {
        const data = await getProjectById(projectId);

        if (!cancelled) {
          setProject(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError("Failed to load project");
          console.error(error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (loading) {
    return <div className="p-6">Loading project...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];
  const priority = priorityConfig[project.priority];

  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon size={36} style={{ color: project.color }} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 capitalize">
              <h1 className="text-2xl font-semibold capitalize">
                {project.name}
              </h1>
              <div
                className={`flex rounded-full px-6 py-1 text-sm items-center justify-center    ${status.textColor} ${status.bgColor}`}
              >
                {status.label}
              </div>
            </div>
            <p className="text-md text-zinc-400">{project.description}</p>
          </div>
        </div>

        <div>
          {projectMembers?.map((members) => (
            <div key={members.userId}>
              <UserAvatar imageUrl={members.user.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
