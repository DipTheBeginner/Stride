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
  const status = statusConfig[project.status as keyof typeof statusConfig];

  const progrss = 0;

  return (
    <div
      onClick={onClick}
      className={`group grid cursor-pointer grid-cols-[auto_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]  rounded-xl border bg-[#0A0D12]/90 p-5 transition-all duration-200 ${
        isSelected
          ? "border-indigo-500 bg-[#0E121A] ring-1 ring-indigo-500/30"
          : "border-white/7 hover:border-indigo-500/40 hover:bg-[#0E121A]"
      }`}
    >
      {" "}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${project.color}20` }}
      >
        <Icon size={25} style={{ color: project.color }} />
      </div>
      <div className="flex flex-col gap-1 px-5">
        <h3 className=" capitalize text-xl font-medium tracking-tight text-[#F7F8F8] transition-colors group-hover:text-white">
          {project.name}
        </h3>

        {/*<p className="line-clamp-2 text-md leading-relaxed text-[#8A8F98]">
          {project.description || "No description provided."}
        </p>*/}
      </div>
      <div className="flex flex-col gap-4">
        {/*<div
          className={`flex w-fit items-center gap-2 rounded-md px-2.5 py-1 text-md font-medium ${status.textColor} ${status.bgColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status.label}
        </div>*/}

        <div className="flex items-center -space-x-2">
          {/*{project.members.slice(0, 4).map((member) => (
            <div
              key={member.userId}
              title={member.user.name}
              className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-zinc-700 text-xs font-medium text-white"
            >
              {member.user.imageUrl ? (
                <Image
                  src={member.user.imageUrl}
                  alt={member.user.name}
                  width={28}
                  height={28}
                />
              ) : (
                member.user.name?.charAt(0).toUpperCase() || "?"
              )}
            </div>
          ))}*/}

          {/*{project.members.length > 4 && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-zinc-800 text-xs text-white">
              +{project.members.length - 4}
            </div>
          )}*/}
        </div>
      </div>
    </div>
  );
}
