"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { projectIcons } from "./project-icons";
import PriorityIcon from "./priority-icon";
import {
  projectColors,
  projectPriorities,
  projectStatuses,
} from "./project-constants";

type ProjectAttributesPanelProps = {
  icon: string;
  setIcon: (icon: string) => void;
  color: string;
  setColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  priority: string;
  setPriority: (priority: string) => void;
};

export default function ProjectAttributesPanel({
  icon,
  setIcon,
  color,
  setColor,
  status,
  setStatus,
  priority,
  setPriority,
}: ProjectAttributesPanelProps) {
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const priorityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(target)
      ) {
        setStatusDropdown(false);
      }
      if (
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(target)
      ) {
        setPriorityDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedStatus = projectStatuses.find(
    (option) => option.value === status,
  );
  const selectedPriority = projectPriorities.find(
    (option) => option.value === priority,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <span className="text-md font-semibold">Icon & Color</span>
        <span>Choose an icon and color to make your project stand out</span>
      </div>

      {/* Icon Picker */}
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

      {/* Color Picker */}
      <div className="flex flex-col gap-3">
        <span>Color</span>
        <div className="grid grid-cols-8 gap-3">
          {projectColors.map((options) => (
            <button
              key={options}
              type="button"
              onClick={() => setColor(options)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                color === options ? "border-white" : "border-transparent"
              }`}
            >
              <span
                className="h-7 w-7 rounded-full"
                style={{ backgroundColor: options }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col">
        <span>Status</span>
        <span>Set the initial status for your project</span>

        <div ref={statusDropdownRef} className="relative mt-4">
          <button
            type="button"
            onClick={() => setStatusDropdown(!statusDropdown)}
            className="flex w-full items-center justify-between rounded-lg bg-[#1A1D23] p-3"
          >
            <div className="flex items-center gap-4">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: selectedStatus?.color }}
              />
              <span>{selectedStatus?.label}</span>
            </div>
            <ChevronDown />
          </button>

          {statusDropdown && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[#1A1E24] shadow-xl">
              {projectStatuses.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setStatus(option.value);
                    setStatusDropdown(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#252B33]"
                >
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />

                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Priority Dropdown */}
      <div className="flex flex-col">
        <span>Priority</span>
        <div>Set the priority level</div>

        <div ref={priorityDropdownRef} className="relative mt-4">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg bg-[#1A1D23] p-2"
            onClick={() => setPriorityDropdown(!priorityDropdown)}
          >
            <div className="flex items-center gap-3">
              <PriorityIcon value={priority} />
              <span>{selectedPriority?.label}</span>
            </div>
            <ChevronDown size={18} />
          </button>

          {priorityDropdown && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[#1A1E24] shadow-xl">
              {projectPriorities.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setPriority(option.value);
                    setPriorityDropdown(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#252B33]"
                >
                  <PriorityIcon value={option.value} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
