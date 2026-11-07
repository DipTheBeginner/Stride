import { useEffect, useState } from "react";
import IssueAttributesPanels from "./issue-attributes-panels";
import { ProjectMember } from "./issue-constants";
import { useProjects } from "../projects/projects-context";

type CreateIssueModalProps = {
  projectId: string;
};

export default function CreateIssueModal({ projectId }: CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [labels, setLabels] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    if (!projectId) {
      return;
    }

    async function fetchProjectMembers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/members`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await response.json();
        setProjectMembers(data.members);
      } catch (error) {
        console.error("Failed to fetch workspace members:", error);
      }
    }

    fetchProjectMembers();
  }, [projectId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex flex-col rounded-lg bg-[#15191E] p-5 w-full max-w-2xl">
        <h1 className="text-2xl font-bold">Create Issue</h1>
        <p className="text-md text-[#8A8F98] mt-2">
          Add a new task,bug or improvement to this project
        </p>

        
        <div className="flex flex-col gap-4">
          <div className="mt-3 flex flex-col gap-2">
            <h1 className="text-md font-semibold">Title</h1>
            <input type="text" className="w-full" />
          </div>

          <div className="gap-2 flex flex-col">
            <h1 className="text-md font-semibold">Description </h1>
            <textarea
              name=""
              id=""
              className="h-20 resize-none w-full"
            ></textarea>
          </div>

          <IssueAttributesPanels
            member={projectMembers}
            type={taskType}
            setType={setTaskType}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            assignee={assignee}
            setAssignee={setAssignee}
          />
        </div>
      </div>
    </div>
  );
}
