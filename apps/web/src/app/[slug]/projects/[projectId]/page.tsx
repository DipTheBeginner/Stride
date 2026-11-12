"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Flag,
  Folder,
  UserRoundArrowLeft,
} from "lucide-react";

import type { Project } from "../../../../../components/projects/projects-context";
import { getProjectById } from "@/services/project.services";
import { projectIcons } from "../../../../../components/projects/project-icons";
import {
  statusConfig,
  priorityConfig,
} from "../../../../../components/projects/project-config";
import UserAvatar from "../../../../../components/ui/user-avatra";
import CreateIssueModal from "../../../../../components/issue/create-issue-modal";
import KanbanBoard from "../../../../../components/issue/kanbanboard";
import { Issue } from "../../../../../components/issue/issue.types";
import { getProjectIssue } from "@/services/issue.services";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [issue, setIssue] = useState<Issue[]>([]);
  const [issuesLoading, setIssuesLoading] = useState(true);
  const [issuesError, setIssuesError] = useState<string | null>(null);

  const projectMembers = project?.members.slice(0, 5);

  useEffect(() => {
    let cancelled = false;

    async function loadIssue() {
      setIssuesLoading(true);
      setIssuesError(null);
      setIssue([]);

      try {
        const data = await getProjectIssue(projectId);

        console.log("Fetched issues:", data);

        if (!cancelled) {
          setIssue(data);
        }
      } catch (error) {
        if (!cancelled) {
          setIssuesError("Failed to load issues");
          console.error(error);
        }
      } finally {
        if (!cancelled) {
          setIssuesLoading(false);
        }
      }
    }

    void loadIssue();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      setLoading(true);
      setError(null);
      setProject(null);

      try {
        const data = await getProjectById(projectId);

        if (!cancelled) {
          setProject(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError("Failed to load project");
          console.error(error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (loading) {
    return <div className="p-6">Loading project...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  const Icon =
    projectIcons[project.icon as keyof typeof projectIcons] ?? Folder;

  const status = statusConfig[project.status];
  const priority = priorityConfig[project.priority];

  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <Icon size={36} style={{ color: project.color }} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 capitalize">
              <h1 className="text-2xl font-semibold capitalize">
                {project.name}
              </h1>
              <div
                className={`flex rounded-full px-6 py-1 text-sm items-center justify-center    ${status.textColor} ${status.bgColor}`}
              >
                {status.label}
              </div>
            </div>
            <p className="text-md text-zinc-400">{project.description}</p>
          </div>
        </div>

        <div className="flex">
          {projectMembers?.map((members) => (
            <div key={members.userId}>
              <UserAvatar
                name={members.user.name}
                imageUrl={members.user.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div>
          <h1>Issues</h1>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between gap-3 items-center">
            <UserRoundArrowLeft />
            <span>Assignee</span>
            <ChevronDown />
          </div>

          <button className="" onClick={() => setIsOpenModal(true)}>
            New Issue
          </button>
        </div>

        {issuesLoading ? (
          <p>Loading issues...</p>
        ) : issuesError ? (
          <p>{issuesError}</p>
        ) : (
          <KanbanBoard issues={issue} />
        )}
      </div>

      {isOpenModal && (
        <CreateIssueModal
          projectId={projectId}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
}
