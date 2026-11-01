import Image from "next/image";
import { Project } from "./projects-context";
import { projectIcons } from "./project-icons";
import { Folder, X } from "lucide-react";

type ProjectSidebarProps = {
  project: Project;
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

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  const status = statusConfig[project.status as keyof typeof statusConfig];
  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  return (
    <div className="p-5 rounded-lg bg-[#101419] flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon size={20} style={{ color: project.color }} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-md capitalize">{project.name}</h1>
            <div className="flex gap-2 items-center">
              <div
                className={`flex w-fit items-center gap-2 rounded-md px-2.5 text-md font-medium ${status.textColor} ${status.bgColor}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {status.label}
              </div>
              <span className="text-xs">updated 2 days ago</span>
            </div>
          </div>
        </div>
        <X size={15} />
      </div>

      

      <div className="justify-between">
        <div>
          <h1>Overview</h1>
          
        </div>

        <div></div>

        <div></div>
      </div>
    </div>
  );
}
