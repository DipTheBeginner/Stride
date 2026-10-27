import { Folder} from "lucide-react";
import { Project } from "./projects-context";
import { projectIcons } from "./project-icons";

type ProjectCardProps = {
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
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
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

export default function ProjectCard({ project }: ProjectCardProps) {

  
  const Icon = projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];

  return (
    <div className="grid grid-cols-[auto_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] border rounded-lg justify-between p-6 items-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${project.color}20` }}
      >
        <Icon size={25} style={{ color: project.color }} />
      </div>

      <div className="flex flex-col px-5">
        <span>{project.name}</span>
        <span>{project.description}</span>
      </div>

      <div className="flex flex-col">
        <div>{project.status}</div>
        <div>{project.members}</div>
      </div>

      <div className="flex flex-col">
        <div>completion bar</div>
        <div>task completeion</div>
      </div>

      <div>setting</div>
    </div>
  );
}
