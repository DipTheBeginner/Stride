import { Folder } from "lucide-react";
import { Project } from "./projects-context";
import { projectIcons } from "./project-icons";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
  isSelected?: boolean;
  onClick?: () => void;
};

const statusConfig = {
  PLANNED: {
    label: "Planned",
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/10",
  },
  ACTIVE: {
    label: "Active",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  ON_HOLD: {
    label: "On hold",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  COMPLETED: {
    label: "Completed",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  CANCELLED: {
    label: "Cancelled",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

export default function ProjectCard({
  project,
  isSelected,
  onClick,
}: ProjectCardProps) {
  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  return (
    <div className="rounded-xl border border-white/10 bg-[#15191E] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon size={20} style={{ color: project.color }} />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="truncate font-semibold">{project.name}</h1>

            <p className="truncate text-sm text-zinc-400">
              {project.description}
            </p>
          </div>
        </div>

        <div className="shrink-0">{project.priority}</div>
      </div>

      <div className="itemcenter"></div>
    </div>
  );
}
