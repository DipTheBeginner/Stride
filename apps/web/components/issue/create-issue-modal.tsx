import { useEffect, useState } from "react";
import IssueAttributesPanels from "./issue-attributes-panels";
import { ProjectMember } from "./issue-constants";
import { useProjects } from "../projects/projects-context";


type CreateIssueModalProps = {
  projectId: string;
};

export default function CreateIssueModal({projectId}:CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [labels, setLabels] = useState("");



  useEffect(() => {
    if (!projectId) {
      return;
    }

    async function fetchProjectMembers() {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/members`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members")
        }

        const data = await response.json()
        setProjectMembers(data.members)
        
      } catch (error) {
        console.error("Failed to fetch workspace members:", error);
        
      }

     
    }

     fetchProjectMembers()

    
  },[projectId])

    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex flex-col rounded-lg bg-[#15191E]">
        <h1>Create Issue</h1>
        <p>Add a new task,bug or improvement to this project</p>

        <div>
          <h1>Title</h1>
          <input type="text" />
        </div>

        <div>
          <h1>Description </h1>
          <textarea name="" id=""></textarea>
        </div>

        <IssueAttributesPanels />
      </div>
    </div>
  );
}
