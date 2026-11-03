import { Calendar, CalendarDays, Flag, Folder } from "lucide-react";
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

const priorityConfig = {
  LOW: {
    label: "Low",
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/10",
  },
  MEDIUM: {
    label: "Medium",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  HIGH: {
    label: "High",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  URGENT: {
    label: "Urgent",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

const tagColors = [
  { text: "text-violet-400", bg: "bg-violet-500/10" },
  { text: "text-blue-400", bg: "bg-blue-500/10" },
];

export default function ProjectCard({
  project,
  isSelected,
  onClick,
}: ProjectCardProps) {
  function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  const Icon =projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;
  const status = statusConfig[project.status as keyof typeof statusConfig];

  const priority =priorityConfig[project.priority as keyof typeof priorityConfig];

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#15191E] p-4" 
      onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon size={20} style={{ color: project.color }} />
          </div>

          <div className="flex min-w-0 flex-col gap-1 ">
            <h1 className="truncate font-semibold capitalize">{project.name}</h1>

            <p className="min-h-12 line-clamp-2 text-md leading-6 text-zinc-400">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-md font-medium
                    ${tagColors[index].text} ${tagColors[index].bg}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-md font-medium ${status.textColor} ${status.bgColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status.label}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div>progress bar</div>

        <div className="mt-5 flex items-center gap-2 text-sm text-zinc-400 justify-between">
          <div className="flex gap-2 items-center">
            <CalendarDays size={17} className="shrink-0" />

            <span>
              {formatDate(project.startDate)}
              {" – "}
              {formatDate(project.dueDate)}
            </span>
          </div>

          <div
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-md font-medium ${priority.textColor} ${priority.bgColor}`}
            >
              <Flag size={14} />
              {priority.label}
            </div>
        </div>
      </div>
    </div>
  );
}
