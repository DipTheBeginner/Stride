"use client"

import { useProjectUpdates } from "@/hooks/use-project";
import { useState } from "react";





export default function Activity(projectId: string) {
  const { data: updates = [], isPending } = useProjectUpdates(projectId);

  const [writeUpdateOpen, setWriteUpdateOpen] = useState(false);

  

  return <div>

    
  </div>;
}
