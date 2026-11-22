"use client";

import { useIssues } from "@/hooks/use-issues-hooks";
import { useProject } from "@/hooks/use-project";
import { useParams } from "next/navigation";
import { projectIcons } from "../../../../../../components/projects/project-icons";
import { CalendarDays, Ellipsis, Folder, Tags, UsersRound } from "lucide-react";
import { statusConfig } from "../../../../../../components/projects/project-config";
import IssueStatCard from "../../../../../../components/issue/issue-stat-card";
import {
  ListTodo,
  Clock3,
  Eye,
  CircleCheck,
} from "lucide-react";

export default function ProjectOverviewPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project, isPending: projectLoading } = useProject(projectId);
  const { data: issues = [], isPending: issuesLoading } = useIssues(projectId);

  if (projectLoading || issuesLoading) {
    return <div>Loading overview...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const totalIssues = issues.length;

  const inProgress = issues.filter(
    (issue) => issue.status === "IN_PROGRESS",
  ).length;

  const inReview = issues.filter((issue) => issue.status === "REVIEW").length;

  const completed = issues.filter((issue) => issue.status === "DONE").length;

  const progress =
    totalIssues === 0 ? 0 : Math.round((completed / totalIssues) * 100);

  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];

  return (
    <div className="p-4">
      <div className="flex flex-col p-5 border rounded-lg">
        <div className="flex justify-between gap-6">
          {/* Left Section */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* Icon + Name + Description */}
            <div className="flex items-center gap-5">
              {/* Project Icon */}
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${project.color}20`,
                }}
              >
                <Icon size={36} style={{ color: project.color }} />
              </div>

              {/* Project Name and Description */}
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold capitalize">
                    {project.name}
                  </h1>

                  <span
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-1 text-xs font-medium leading-none ${status.textColor} ${status.bgColor}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {status.label}
                  </span>
                </div>

                <p className="text-base text-zinc-400 capitalize">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Tags and Future Project Details */}
            <div className="flex flex-wrap items-center gap-15 pl-25">
              {project.tags?.[0] && (
                <div className="flex items-center gap-2">
                  <Tags size={18} className="text-zinc-500" />

                  <span className="text-sm font-medium capitalize text-zinc-400">
                    {project.tags[0]}
                  </span>
                </div>
              )}

              <div className="flex gap-3 items-center text-sm text-zinc-400">
                <CalendarDays size={18} className="text-zinc-400" />

                <span>
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })
                    : "No start date "}
                </span>
                <span className="text-zinc-600">-</span>

                <span>
                  {project.dueDate
                    ? new Date(project.dueDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })
                    : "No due date"}
                </span>
              </div>

              <div className="flex text-sm text-zinc-400 gap-3 items-center">
                <UsersRound size={18} />
                <div className="flex gap-1">
                  {project.members.length}
                  <h1>members</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <button className="flex h-10 w-12 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5">
              <Ellipsis size={18} />
            </button>

            <button className="rounded-lg border border-white/10 px-6 py-2 text-sm hover:bg-white/5">
              Edit Project
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div>
          

      <div className="mt-8 grid grid-cols-4 gap-4">
        
        <IssueStatCard
          title="Total Issues"
          value={totalIssues}
          icon={ListTodo}
          color="#A78BFA"
        />
      
        <IssueStatCard
          title="In Progress"
          value={inProgress}
          icon={Clock3}
          color="#60A5FA"
        />
      
        <IssueStatCard
          title="In Review"
          value={inReview}
          icon={Eye}
          color="#FBBF24"
        />
      
        <IssueStatCard
          title="Completed"
          value={completed}
          icon={CircleCheck}
          color="#34D399"
        />
        </div>
        </div>














        <div>Right</div>
      </div>
    </div>
  );
}
