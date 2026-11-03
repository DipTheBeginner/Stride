"use client";

import { useParams } from "next/navigation";
import { useProjects } from "../../../../../components/projects/projects-context";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const project = useProjects();

  return (

    

    
    <div className="p-6">
      <div>
        
      </div>
    </div>
  );
}