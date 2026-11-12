import { useEffect, useState } from "react";
import IssueAttributesPanels from "./issue-attributes-panels";
import { ProjectMember } from "./issue-constants";
import { useProjects } from "../projects/projects-context";
import { Calendar } from "lucide-react";

type CreateIssueModalProps = {
  projectId: string;
   onClose: () => void;
};

export default function CreateIssueModal({ projectId,onClose }: CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("TASK");
  const [status, setStatus] = useState("TO_DO");
  const [priority, setPriority] = useState("MEDIUM");
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function submitIssue() {

    if (isSubmitting) return;
    
   
    
    if (!title.trim()) {
      alert("Issue title is required");
      return;
    }

      setIsSubmitting(true);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/issue`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            type: taskType,
            status,
            priority,
            assigneeId: assignee || null,
            dueDate: dueDate || null,
            labels: tags,
          }),
        },
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to create issue");
      }
  
      console.log("Issue created successfully:", data.issue);
      onClose();
    } catch (error) {
      console.error("Failed to create issue:", error);
    }finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex flex-col rounded-lg bg-[#0E1418] p-5 w-full max-w-2xl">
        <h1 className="text-2xl font-bold">Create Issue</h1>
        <p className="text-md text-[#8A8F98] mt-2">
          Add a new task,bug or improvement to this project
        </p>

        <div className="flex flex-col gap-4">
          <div className="mt-3 flex flex-col gap-2">
            <h1 className="text-md font-semibold">Title</h1>
            <input
              type="text"
              className="w-full px-3 bg-[#141E24] py-2 rounded-md hover:outline-blue-700 outline-none "
              placeholder="Enter a clear and concise title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="gap-2 flex flex-col">
            <h1 className="text-md font-semibold">Description</h1>
            <textarea
              name=""
              id=""
              className="h-30 resize-none w-full px-3 py-2 rounded-md outline-none bg-[#141E24] "
              placeholder="Add a detailed description..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
            dueDate={dueDate}
            setDueDate={setDueDate}
            tags={tags}
            setTags={setTags}
          />

          <div className="h-0.5 w-full bg-slate-800" />

          <div className="flex justify-end gap-6">
            <span className="px-10 py-3 bg-[#121A21] rounded-md cursor-pointer" onClick={onClose}>Cancel</span>
            <button
              type="button"
              onClick={submitIssue}
              disabled={isSubmitting}
              className="px-10 py-3 bg-blue-600 hover:bg-blue-500 rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Issue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
