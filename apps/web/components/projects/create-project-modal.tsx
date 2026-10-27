"use client";

import { ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { useWorkspace } from "../workspace/workspace-context";
import { useProjects } from "./projects-context";
import { projectIcons } from "./project-icons";

type CreateProjectModalProps = {
  onClose: () => void;
};

export default function CreateProjectModal({
  onClose,
}: CreateProjectModalProps) {
  const { id: workspaceId } = useWorkspace();
  const { refreshProjects } = useProjects();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [icon, setIcon] = useState("folder");
  const [color, setColor] = useState("#9B72F2");

  const projectColors = [
    "#9B72F2",
    "#328FF0",
    "#32C48D",
    "#F97345",
    "#F43F5E",
    "#EAB308",
    "#06B6D4",
    "#EC4899",
  ];

  async function handlecreateProject() {
    if (!name.trim()) {
      throw new Error("Project name is required");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(workspaceId)}/createproject`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            description,
            icon,
            color,
          }),
        },
      );

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

  const SelectedIcons = projectIcons[icon as keyof typeof projectIcons];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className=" flex flex-col  bg-[#15191E] rounded-lg p-8">
        <div className="flex justify-between bg-[#15191E]  rounded-lg">
          <div className="flex gap-6 items-center ">
            <div className="flex p-4 bg-[#252748] rounded-lg items-center justify-center h-16 w-16 shrink-0">
              <Plus
                className="border-2 border-[#746BCB] rounded-lg "
                size={24}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-bold">Create Project</span>
              <span className="text-md text-[#8A8F98]">
                Start something new in your workspace
              </span>
            </div>
          </div>
          <div>
            <X />
          </div>
        </div>

        <div className="mx-4 my-2 border-t border-white/10" />

        <div className="grid grid-cols-[1.2fr_1fr] gap-6">
          {/*Left Side*/}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Basic Information</span>
              <span className="text-sm text-[#8A8F98] ">
                Give your project a clear name and description
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-md font-semibold">Project name</span>
              <input
                type="text"
                className=" bg-[#191E22] rounded-lg p-2"
                placeholder="e.g. Website Redesign"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-md font-semibold">Description</span>
              <textarea
                name=""
                id=""
                className=" bg-[#191E22] rounded-lg p-2"
                placeholder="Briefly describe what this project is about"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <span className="text-md font-semibold">Project Lead</span>
              <span className="text-sm text-[#8A8F98] ">
                Select a member to lead this project
              </span>
              <div className="flex justify-between items-center rounded-lg p-2 bg-[#1A1E24] mt-2">
                <div className="flex  items-center justify-between">
                  <span className="rounded-full">.</span>
                  <div>select a memeber from workspace</div>
                </div>
                <ChevronDown />
              </div>
            </div>
          </div>

          {/*Right side of the modal*/}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-md font-semibold">Icon & Color</span>
              <span>
                Choose an icon and color to make your project stand out
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-md font-semibold">Icon</span>

              <div className="grid grid-cols-6 gap-3">
                {Object.entries(projectIcons).map(([iconName, Icon]) => (
                  <button
                    key={iconName}
                    onClick={() => setIcon(iconName)}
                    type="button"
                    className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-colors ${
                      icon === iconName
                        ? "border-[#9B72F2] bg-[#9B72F2]/15"
                        : "border-white/10 bg-[#1A1E24] hover:bg-[#252B33]"
                    }`}
                  >
                    <Icon
                      size={22}
                      style={{ color: icon === iconName ? color : "#A1A1AA" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span>Color</span>
              <div className="grid grid-cols-8 gap-3">
                {projectColors.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setColor(option)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      color === option ? "border-white" : "border-transparent"
                    }`}
                  >
                    <span
                      className="h-7 w-7 rounded-full"
                      style={{ backgroundColor: option }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span>Status</span>
              <span>Set the inital status for your project</span>

              <div>
                <span className="""></span>
              </div>
            </div>



            
          </div>
        </div>
      </div>
    </div>
  );
}
