"use client"

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useWorkspace } from "../workspace/workspace-context";
import { useProjects } from "./projects-context";
import { useUser } from "../auth/user-context";
import { projectIcons } from "./project-icons";
import { WorkspaceMember } from "./project-constants";
import ProjectTeamSelectors from "./project-team-selectors";
import ProjectAttributesPanel from "./project-atrributes-panel";

type CreateProjectModalProps = {
  onClose: () => void;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateProjectModal({
  onClose,
}: CreateProjectModalProps) {
  const { id: workspaceId, slug } = useWorkspace();
  const { refreshProjects } = useProjects();
  const { user } = useUser();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [status, setStatus] = useState("PLANNED");
  const [icon, setIcon] = useState("folder");
  const [color, setColor] = useState("#9B72F2");
  const [priority, setPriority] = useState("MEDIUM");
  const [isCreating, setIsCreating] = useState(false);

  async function handlecreateProject() {
    if (!name.trim()) {
      console.error("Project name is required");
      return;
    }

    try {
      setIsCreating(true);
      const response = await fetch(
        `${BASE_URL}/projects/${encodeURIComponent(workspaceId)}/createproject`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            description,
            icon,
            color,
            leadId: selectedLeadId ?? user?.id,
            memberIds: selectedMemberIds,
            priority,
            status,
          }),
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to create project: ${response.status} ${errorBody}`);
      }

      await refreshProjects();
      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
    }finally {
      setIsCreating(false);
    }
  }

  useEffect(() => {
    if (!slug) return;

    async function fetchWorkspaceMembers() {
      try {
        const response = await fetch(
          `${BASE_URL}/workspaces/${encodeURIComponent(slug)}/members`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workspace members");
        }

        const data = await response.json();
        setMembers(data.members);
      } catch (error) {
        console.error("Failed to fetch workspace members:", error);
      }
    }

    fetchWorkspaceMembers();
  }, [slug]);

  const SelectedIcons = projectIcons[icon as keyof typeof projectIcons];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex flex-col rounded-lg bg-[#15191E] p-8">
        {/* Header */}
        <div className="flex justify-between rounded-lg bg-[#15191E]">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#252748] p-4">
              <SelectedIcons size={30} style={{ color }} />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-bold">Create Project</span>
              <span className="text-md text-[#8A8F98]">
                Start something new in your workspace
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="cursor-pointer self-start">
            <X />
          </button>
        </div>

        <div className="-mx-9 mt-6 border-t border-white/10" />

        {/* Body */}
        <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-6">
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Basic Information</span>
              <span className="text-sm text-[#8A8F98]">
                Give your project a clear name and description
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-md font-semibold">Project name</span>
              <input
                type="text"
                className="rounded-lg bg-[#191E22] p-2"
                placeholder="e.g. Website Redesign"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-md font-semibold">Description</span>
              <textarea
                className="h-36 resize-none rounded-lg bg-[#191E22] p-3"
                placeholder="Briefly describe what this project is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <ProjectTeamSelectors
              members={members}
              currentUser={user}
              selectedLeadId={selectedLeadId}
              setSelectedLeadId={setSelectedLeadId}
              selectedMemberIds={selectedMemberIds}
              setSelectedMemberIds={setSelectedMemberIds}
            />
          </div>

          {/* Right Side */}
          <ProjectAttributesPanel
            icon={icon}
            setIcon={setIcon}
            color={color}
            setColor={setColor}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
          />
        </div>

        <div className="-mx-8 my-2 mt-6 border-t border-white/10" />

        {/* Footer */}
        <div className="mt-4 flex items-center justify-end gap-4">
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-slate-500 px-10 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlecreateProject}
            disabled={isCreating || !name.trim()}
            className="cursor-pointer rounded-lg border border-slate-500 bg-blue-700 px-10 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}