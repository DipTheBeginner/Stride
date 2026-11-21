"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Folder, UserRoundArrowLeft } from "lucide-react";

import { projectIcons } from "../../../../../components/projects/project-icons";
import { statusConfig } from "../../../../../components/projects/project-config";

import UserAvatar from "../../../../../components/ui/user-avatra";
import CreateIssueModal from "../../../../../components/issue/create-issue-modal";
import KanbanBoard from "../../../../../components/issue/kanbanboard";

import type { Issue } from "../../../../../components/issue/issue.types";

import { useProject } from "@/hooks/use-project";
import { useIssues } from "@/hooks/use-hooks";
import { useUpdateIssueStatus } from "@/hooks/use-update-issue-status";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const queryClient = useQueryClient();

  const [isOpenModal, setIsOpenModal] = useState(false);

  // Fetch project using TanStack Query
  const { data: project, isPending, isError, error } = useProject(projectId);

  const { mutate: updateStatus } = useUpdateIssueStatus(projectId);

  // Fetch issues using TanStack Query
  const {
    data: issues = [],
    isPending: issuesLoading,
    isError: hasIssueError,
    error: issueError,
  } = useIssues(projectId);



  const projectMembers = project?.members.slice(0, 5);

  // Update issues cache after creating a new issue
  const handleIssueCreated = (newIssue: Issue) => {
    queryClient.setQueryData<Issue[]>(["issues", projectId], (old = []) => [
      ...old,
      newIssue,
    ]);
  };

  //update issue on status change
  const handleIssueStatusChange = (
    issueId: string,
    newStatus: Issue["status"],
  ) => {
    updateStatus({
      issueId,
      status:newStatus,
    })
  };

  if (isPending) {
    return <div className="p-6">Loading project...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-400">{error.message}</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];

  return (
    <div className="flex h-full min-h-0 flex-col p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${project.color}20`,
            }}
          >
            <Icon size={36} style={{ color: project.color }} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 capitalize">
              <h1 className="text-2xl font-semibold capitalize">
                {project.name}
              </h1>

              <div
                className={`flex items-center justify-center rounded-full px-6 py-1 text-sm ${status.textColor} ${status.bgColor}`}
              >
                {status.label}
              </div>
            </div>

            <p className="text-md text-zinc-400">{project.description}</p>
          </div>
        </div>

        <div className="flex">
          {projectMembers?.map((member) => (
            <div key={member.userId}>
              <UserAvatar
                name={member.user.name}
                imageUrl={member.user.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div>
          <h1>Issues</h1>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-3">
            <UserRoundArrowLeft />
            <span>Assignee</span>
            <ChevronDown />
          </div>

          <button onClick={() => setIsOpenModal(true)}>New Issue</button>
        </div>

        <div className="mt-10 min-h-0 flex-1">
          {issuesLoading ? (
            <p>Loading issues...</p>
          ) : hasIssueError ? (
            <p className="text-red-400">{issueError.message}</p>
          ) : (
            <KanbanBoard
              issues={issues}
              projectKey={project.key ?? ""}
              onIssueStatusChange={handleIssueStatusChange}
            />
          )}
        </div>
      </div>

      {isOpenModal && (
        <CreateIssueModal
          onIssueCreated={handleIssueCreated}
          projectId={projectId}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
}
