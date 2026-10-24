import { Globe } from "lucide-react";
import { Project } from "./projects-context";

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

  const status = statusConfig[project.status];
  
  return (
    <div className="flex">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/20">
          <Globe size={25} className="text-violet-400" strokeWidth={2.3} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-semibold">{project.name}</span>
          <div className="text-sm text-[#565B65]">{project.description}</div>
        </div>
        <div className="flex flex-col">
          <div className={`inline-flex w-fit items-center rounded-md px-2.5 py-1 ${status.bgColor}`}>
            <span className={`text-md font-medium ${status.textColor}`}>
              {status.label}
            </span>
          </div>
          <div>Members logo</div>
        </div>
        <div className="flex flex-col">
          <div>completion bar</div>
          <div className="flex">
            <div>task number</div>
            <div>completion percentage</div>
          </div>
        </div>
        <div>settings</div>
      </div>
    </div>
  );
}
