"use client";

import { useIssues } from "@/hooks/use-issues-hooks";
import { useProject } from "@/hooks/use-project";
import { useParams } from "next/navigation";
import { projectIcons } from "../../../../../../components/projects/project-icons";
import {
  CalendarDays,
  Ellipsis,
  Folder,
  Tags,
  UsersRound,
  ListTodo,
  Clock3,
  Eye,
  CircleCheck,
} from "lucide-react";
import { statusConfig } from "../../../../../../components/projects/project-config";
import IssueStatCard from "../../../../../../components/issue/issue-stat-card";
import UserAvatar from "../../../../../../components/ui/user-avatra";
import formatRelativeTime from "@/lib/format-date";
import AddProjectMembersDialog from "../../../../../../components/projects/add-project-members-dialog";
import { useState } from "react";

export default function ProjectOverviewPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project, isPending: projectLoading } = useProject(projectId);
  const { data: issues = [], isPending: issuesLoading } = useIssues(projectId);

  const [addMembersOpen, setAddMembersOpen] = useState(false);

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

  const weekStart = new Date();

  weekStart.setDate(weekStart.getDate() - 7);

  const newIssueThisWeek = issues.filter(
    (issue) => issue.createdAt && new Date(issue.createdAt) >= weekStart,
  ).length;

  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];

  const recentIssues = [...issues]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="p-4">
      {/* Project Header */}
      <div className="flex flex-col rounded-lg border p-5">
        <div className="flex justify-between gap-6">
          {/* Left Header Section */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* Icon + Name + Description */}
            <div className="flex items-center gap-5">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${project.color}20`,
                }}
              >
                <Icon size={36} style={{ color: project.color }} />
              </div>

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

            {/* Tags, Dates and Members */}
            <div className="flex flex-wrap items-center gap-15 pl-25">
              {project.tags?.[0] && (
                <div className="flex items-center gap-2">
                  <Tags size={18} className="text-zinc-500" />

                  <span className="text-sm font-medium capitalize text-zinc-400">
                    {project.tags[0]}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <CalendarDays size={18} className="text-zinc-400" />

                <span>
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })
                    : "No start date"}
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

              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <UsersRound size={18} />

                <div className="flex gap-1">
                  {project.members.length}
                  <span>members</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-start gap-2">
            <button
              type="button"
              className="flex h-10 w-12 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5"
            >
              <Ellipsis size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg border border-white/10 px-6 py-2 text-sm hover:bg-white/5"
            >
              Edit Project
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        {/* Left Section */}
        <div className="min-w-0 space-y-4">
          {/* Issue Statistics */}
          <div className="grid grid-cols-2 gap-4 2xl:grid-cols-4">
            <IssueStatCard
              title="Total Issues"
              value={totalIssues}
              icon={ListTodo}
              color="#A78BFA"
              weeklyChange={newIssueThisWeek}
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

          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
            {/* Recent Issues */}
            <div className="flex h-[360px] min-w-0 flex-col overflow-hidden rounded-xl border border-white/10">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 className="text-sm font-semibold">Recent Issues</h2>

                <button
                  type="button"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                  View all
                </button>
              </div>

              {/* Issue List */}
              <div className="min-h-0 flex-1 overflow-y-auto">
                {recentIssues.length === 0 ? (
                  <p className="p-5 text-sm text-zinc-500">No issues yet</p>
                ) : (
                  recentIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="grid grid-cols-[minmax(0,1fr)_55px_90px_32px_55px] items-center gap-2 border-b border-white/5 px-5 py-4 transition-colors last:border-b-0 hover:bg-white/3"
                    >
                      {/* Issue Title + Status Dot */}
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            issue.status === "DONE"
                              ? "bg-emerald-400"
                              : issue.status === "IN_PROGRESS"
                                ? "bg-blue-400"
                                : issue.status === "REVIEW"
                                  ? "bg-amber-400"
                                  : "bg-zinc-500"
                          }`}
                        />

                        <p
                          className="truncate text-sm font-medium capitalize"
                          title={issue.title}
                        >
                          {issue.title}
                        </p>
                      </div>

                      {/* Issue Type */}
                      <span className="justify-self-start rounded-lg border border-white/10 px-2.5 py-1 text-xs capitalize text-zinc-400">
                        {issue.type.toLowerCase()}
                      </span>

                      {/* Issue Priority */}
                      <span className="justify-self-start rounded-lg border border-white/10 px-2.5 py-1 text-xs capitalize text-zinc-400">
                        {issue.priority.toLowerCase()}
                      </span>

                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-zinc-800">
                        <UserAvatar
                          imageUrl={issue.assignee?.imageUrl}
                          name={issue.assignee?.name ?? "Unassigned"}
                        />
                      </div>

                      <span className="text-right text-xs tabular-nums text-zinc-500">
                        {formatRelativeTime(issue.createdAt)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="flex h-[360px] min-w-0 flex-col overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="text-sm font-semibold">Recent Activity</h2>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <p className="text-sm text-zinc-500">No activity yet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="min-w-0 space-y-4">
          <div className="rounded-xl border border-white/10 ">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-sm font-semibold">Team</h2>

              <button
                type="button"
                className="text-xs font-medium text-blue-400 hover:text-blue-300"
              >
                View all
              </button>
            </div>
            <div className="p-5">
              {project.members.length === 0 ? (
              <p className="text-sm text-zinc-400">No team members yet</p>
              ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    {project.members.map((member) => (
                      <div key={member.userId} className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-800">
                        <UserAvatar name={member.user.name ?? "Member"} imageUrl={member.user.imageUrl}   />
                        
                      </div>
                    ))}
                  </div>
              )
              }
              <button
                     type="button"
                     onClick={() => setAddMembersOpen(true)}
                     className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
                   >
                     <UsersRound size={16} />
                     Invite member
                   </button>
            </div>
          </div>

          {addMembersOpen && (
            <AddProjectMembersDialog
              projectId={projectId}
              onClose={() => setAddMembersOpen(false)}
            />
          )}

          {/* Team, Project Details, Tags, Links */}
        </div>
      </div>
    </div>
  );
}
