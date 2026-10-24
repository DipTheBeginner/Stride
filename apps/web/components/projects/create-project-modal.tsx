"use client"

import { X } from "lucide-react";
import { useState } from "react";
import { useWorkspace } from "../workspace/workspace-context";
import { useProjects } from "./projects-context";


type CreateProjectModalProps = {
  onClose: () => void;
};

export default function CreateProjectModal({
  onClose
}: CreateProjectModalProps) {

  const { id: workspaceId } = useWorkspace();
  const { refreshProjects } = useProjects();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("");


  async function handlecreateProject(){
    if (!name.trim()) {
      throw new Error("Project name is required")
    }

    

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(workspaceId)}/createproject`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":"application/json"
          },

          body: JSON.stringify({
            name: name.trim(),
            description
          })
        }
      )

      if (!response.ok) {
        const errorBody = await response.text();
        
          throw new Error(
            `Failed to fetch projects: ${response.status} ${errorBody}`,
          );
      }

      await refreshProjects();

      onClose();

    
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }


  
  return (
    <div className="bg-[#0C0E0F] flex flex-col w-1/2 p-6 rounded-lg">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Create project</span>
          <span className="text-sm text-[#8A8F98]">Start something new in your workspace</span>
        </div>
        <button type="button" onClick={onClose}>
          <X size={20} />
        </button>
        
      
      </div>

      <div className="my-2 border-b border-white/10 mt-4" />

      <div className="flex flex-col">
        <span className="text-sm">Project name</span>
        <input
          value={name}
          onChange={(event)=>setName(event.target.value)}

          type="text" className="mt-2 bg-[#202024]" />
        <span>Descreption</span>
        <textarea name="" id="" value={description} onChange={(event)=>setDescription(event.target.value)}></textarea>

        <div>
          <div>
            <span>Statuses</span>
            <input type="text" />
            
            
          </div>
          <div>
            <span>Priority</span>
            <input type="text" />
          </div>
        </div>

        <span>Project Lead</span>
        
      </div>

      <div>
        <span>cancel</span>
        <button onClick={handlecreateProject}>
          Create project
        </button>
      </div>

      
    </div>
  )
}