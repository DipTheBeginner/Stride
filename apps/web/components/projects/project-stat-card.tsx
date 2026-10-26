"use client";

import { Check, CircleDashed, Folder, Pause } from "lucide-react";
import { useProjects } from "./projects-context";

export default function ProjectStatCard() {
  const { projects } = useProjects();

  const projectStats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: Folder,
      color: "#9B72F2",
    },
    {
      title: "Active Projects",
      value: projects.filter((p) => p.status === "ACTIVE").length,
      icon: CircleDashed,
      color: "#328FF0",
    },
    {
      title: "On Hold",
      value: projects.filter((p) => p.status === "ON_HOLD").length,
      icon: Pause,
      color: "#F97345",
    },
    {
      title: "Completed",
      value: projects.filter((p) => p.status === "COMPLETED").length,
      icon: Check,
      color: "#32C48D",
    },
  ];

  return (
    <div>
      
    </div>
  );
}