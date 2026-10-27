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
    <div className="flex gap-4 ">
      {projectStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="flex items-center gap-4 rounded-lg border px-8 py-3"
          >
            <div>
              <div className="rounded-full border p-2">
                
              <Icon size={24} style={{ color: stat.color }} />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-sm text-gray-400">{stat.title}</span>
            </div>

            <div className="ml-auto">{/* We will implement this later */}</div>
          </div>
        );
      })}
    </div>
  );
}
