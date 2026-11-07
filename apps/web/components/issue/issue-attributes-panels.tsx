import { Check, ChevronDown, LucideClipboardList, UserRound } from "lucide-react";
import { useState } from "react";
import {
  issuePriority,
  IssueStatuses,
  issueType,
  ProjectMember,
} from "./issue-constants";
import Image from "next/image";
import UserAvatar from "../ui/user-avatra";

type IssueAttributesPanelsProps = {
  member: ProjectMember[];

  type: string;
  setType: (type: string) => void;

  status: string;
  setStatus: (status: string) => void;

  priority: string;
  setPriority: (priority: string) => void;

  assignee: string;
  setAssignee: (type: string) => void;
};

export default function IssueAttributesPanels({
  member,
  assignee,
  setAssignee,
  type,
  setType,
  status,
  setStatus,
  priority,
  setPriority,
}: IssueAttributesPanelsProps) {
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [assigneeDropdown, setAssigneeDropdown] = useState(false);

  const selectedAssignee = member.find((m) => m.userId === assignee);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-4 items-center justify-center">
        {/*Task type*/}

        <div className="relative ">
          <span>Type</span>
          <button
            className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
            onClick={() => setTypeDropdown(!typeDropdown)}
          >
            <div className="flex gap-1 items-center">
              <LucideClipboardList />
              <h1 className="capitalize">{type}</h1>
            </div>
            <div>
              <ChevronDown />
            </div>
          </button>

          {typeDropdown && (
            <div className="absolute flex flex-col w-full top-full left-0 z-20 rounded-lg border border-white/10 bg-[#1A1E24]">
              {issueType.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setType(type.value);
                    setTypeDropdown(false);
                  }}
                  className="flex px-4 py-2 items-center text-left gap-3 hover:bg-[#252B33]"
                >
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {/*Status*/}

        <div className="relative">
          <button
            className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
            onClick={() => setStatusDropdown(!statusDropdown)}
          >
            <div className="flex gap-1 items-center">
              <div className="rounded-full h-2.5 w-2.5" />
              <h1>{status}</h1>
            </div>

            <div>
              <ChevronDown />
            </div>
          </button>

          {statusDropdown && (
            <div className="absolute flex flex-col w-full top-full left-0 z-20 rounded-lg border border-white/10 bg-[#1A1E24]">
              {IssueStatuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => {
                    setStatus(status.value);
                    setStatusDropdown(false);
                  }}
                  className="items-center text-left px-4 py-2 gap-3 hover:bg-[#252B33] w-full"
                >
                  {status.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/*Priority*/}

        <div className="relative">
          <button
            className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
            onClick={() => setPriorityDropdown(!priorityDropdown)}
          >
            <div className="flex gap-1 items-center">
              <div className="rounded-full h-2.5 w-2.5" />
              <h1>Medium</h1>
            </div>

            <div>
              <ChevronDown />
            </div>
          </button>

          {priorityDropdown && (
            <div className="absolute flex flex-col w-full top-full left-0 z-20 rounded-lg border border-white/10 bg-[#1A1E24]">
              {issuePriority.map((issue) => (
                <button
                  key={issue.value}
                  
                  className="items-center text-left px-4 py-2 gap-3 hover:bg-[#252B33] w-full"
                >
                  {issue.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/*members*/}

      {/* Assignee */}
      
      <div className="grid grid-cols-3 items-center gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setAssigneeDropdown(!assigneeDropdown)}
            className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#1A1D23] p-3 hover:bg-[#222730]"
          >
            <div className="flex min-w-0 items-center gap-2">
              {selectedAssignee ? (
                <UserAvatar
                  name={selectedAssignee.user.name}
                  imageUrl={selectedAssignee.user.imageUrl}
                  size={24}
                />
              ) : (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#30343B] text-xs text-[#8A8F98]">
                  <UserRound size={14} />
                </div>
              )}
      
              <span className="truncate text-sm font-medium capitalize text-white">
                {selectedAssignee?.user.name ?? "Unassigned"}
              </span>
            </div>
      
            <ChevronDown
              size={16}
              className="shrink-0 text-[#8A8F98]"
            />
          </button>
      
          {assigneeDropdown && (
            <div className="absolute top-full left-0 z-50 mt-2 max-h-64 w-72 overflow-y-auto rounded-xl border border-[#30343B] bg-[#1C1F26] p-2 shadow-xl">
              {/* Unassigned option */}
              <button
                type="button"
                onClick={() => {
                  setAssignee("");
                  setAssigneeDropdown(false);
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left hover:bg-[#30343B]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#30343B] text-[#8A8F98]">
                  <UserRound size={16} />
                </div>
      
                <span className="flex-1 text-sm text-[#B5BAC4]">
                  Unassigned
                </span>
      
                {!assignee && (
                  <Check size={16} className="text-[#9B72F2]" />
                )}
              </button>
      
              <div className="my-1 border-t border-white/10" />
      
              {/* Project members */}
              {member.map((m) => (
                <button
                  key={m.userId}
                  type="button"
                  onClick={() => {
                    setAssignee(m.userId);
                    setAssigneeDropdown(false);
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left hover:bg-[#30343B]"
                >
                  <UserAvatar
                    name={m.user.name}
                    imageUrl={m.user.imageUrl}
                    size={30}
                  />
      
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-sm font-medium capitalize text-white">
                      {m.user.name}
                    </span>
      
                    {m.user.email && (
                      <span className="truncate text-xs text-[#8A8F98]">
                        {m.user.email}
                      </span>
                    )}
                  </div>
      
                  {assignee === m.userId && (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9B72F2]">
                      <Check
                        size={13}
                        strokeWidth={3}
                        className="text-white"
                      />
                    </div>
                  )}
                </button>
              ))}
      
              {member.length === 0 && (
                <p className="px-3 py-4 text-center text-sm text-[#8A8F98]">
                  No project members found
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
