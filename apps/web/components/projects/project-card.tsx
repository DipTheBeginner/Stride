
import { CalendarDays, Flag, Folder } from "lucide-react";
import type { Project } from "./projects-context";
import { projectIcons } from "./project-icons";
import { statusConfig, priorityConfig } from "./project-config";

type ProjectCardProps = {
  project: Project;
  isSelected?: boolean;
  onClick?: () => void;
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

  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];
  const priority = priorityConfig[project.priority];

  return (
    <div
      onClick={onClick}
      className={`flex h-full flex-col rounded-xl border bg-[#15191E] p-4 transition-colors ${
        onClick ? "cursor-pointer" : ""
      } ${
        isSelected
          ? "border-white/30"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon size={20} style={{ color: project.color }} />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="truncate font-semibold capitalize">
              {project.name}
            </h1>

            <p className="line-clamp-2 min-h-12 text-base leading-6 text-zinc-400">
              {project.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className={`rounded-full px-2.5 py-1 text-sm font-medium ${
                    tagColors[index % tagColors.length].text
                  } ${tagColors[index % tagColors.length].bg}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Status */}
        <div
          className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${status.textColor} ${status.bgColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status.label}
        </div>
      </div>

      <div className="mt-auto pt-6">
        {/* Progress bar will be added after tasks */}
        <div>progress bar</div>

        <div className="mt-5 flex items-center justify-between gap-2 text-sm text-zinc-400">
          <div className="flex min-w-0 items-center gap-2">
            <CalendarDays size={17} className="shrink-0" />
            <span className="truncate">
              {formatDate(project.startDate)}
              {" – "}
              {formatDate(project.dueDate)}
            </span>
          </div>

          {/* Priority */}
          <div
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${priority.textColor} ${priority.bgColor}`}
          >
            <Flag size={14} />
            {priority.label}
          </div>
        </div>
      </div>
    </div>
  );
}
