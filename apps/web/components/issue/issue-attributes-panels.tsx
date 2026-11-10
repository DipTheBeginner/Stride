import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  LucideClipboardList,
  Plus,
  Tags,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  issuePriority,
  IssueStatuses,
  issueType,
  ProjectMember,
} from "./issue-constants";
import Image from "next/image";
import UserAvatar from "../ui/user-avatra";
import PriorityIcon from "../projects/priority-icon";
import DatePicker from "../ui/date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Span } from "next/dist/trace";

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

  dueDate: string;
  setDueDate: (date: string) => void;

  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
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
  dueDate,
  setDueDate,
  tags,
  setTags,
}: IssueAttributesPanelsProps) {
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [assigneeDropdown, setAssigneeDropdown] = useState(false);

  const [tagInput, setTagInput] = useState("");

  const selectedType = issueType.find((item) => item.value === type);

  const selectedStatus = IssueStatuses.find((item) => item.value === status);

  const selectedPriority = issuePriority.find(
    (item) => item.value === priority,
  );

  const selectedAssignee = member.find((m) => m.userId === assignee);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const priorityDropdownRef = useRef<HTMLDivElement>(null);
  const assigneeDropdownRef = useRef<HTMLDivElement>(null);


  function addTag() {
    const newTag = tagInput.trim();

    if (!newTag) {
      return;
    }

    if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
      return;
    }

    setTags((prev) => [...prev, newTag]);
    setTagInput("");
  }

  function removeTag(tagToRemove: string) {

    setTags((prev)=>prev.filter((tag)=>tag!==tagToRemove))
    
  }

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

      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(target)
      ) {
        setTypeDropdown(false);
      }

      if (
        assigneeDropdownRef.current &&
        !assigneeDropdownRef.current.contains(target)
      ) {
        setAssigneeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-4 items-center justify-center">
        {/*Task type*/}

        <div className="relative flex flex-col gap-2" ref={typeDropdownRef}>
          <span>Type</span>
          <button
            className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
            onClick={() => setTypeDropdown(!typeDropdown)}
          >
            <div className="flex gap-3 items-center">
              {selectedType && (
                <selectedType.icon size={20} color={selectedType.color} />
              )}
              <span>{selectedType?.label}</span>
            </div>
            <div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-100 ${typeDropdown ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {typeDropdown && (
            <div className="absolute flex flex-col w-full top-full left-0 z-20 rounded-lg border border-white/10 bg-[#1A1E24]">
              {issueType.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setType(item.value);
                    setTypeDropdown(false);
                  }}
                  className="flex px-4 py-2 items-center text-left gap-3 hover:bg-[#252B33]"
                >
                  <item.icon size={18} color={item.color} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {/*Status*/}

        <div className="relative gap-2 flex flex-col" ref={statusDropdownRef}>
          <h1>Status</h1>
          <button
            className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
            onClick={() => setStatusDropdown(!statusDropdown)}
          >
            <div className="flex gap-3 items-center">
              <div
                className="rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: selectedStatus?.color }}
              />
              <span>{selectedStatus?.label}</span>
            </div>

            <div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-100 ${statusDropdown ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {statusDropdown && (
            <div className="absolute flex flex-col w-full top-full left-0 z-20 rounded-lg border border-white/10 bg-[#1A1E24]">
              {IssueStatuses.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setStatus(option.value);
                    setStatusDropdown(false);
                  }}
                  className="items-center text-left px-4 py-2 gap-3 hover:bg-[#252B33] w-full flex"
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

        {/*Priority*/}

        <div className="relative flex flex-col gap-3" ref={priorityDropdownRef}>
          <h1>Priority</h1>
          <button
            className="flex justify-between rounded-lg p-3 w-full items-center  bg-[#1A1D23]"
            onClick={() => setPriorityDropdown(!priorityDropdown)}
          >
            <div className="flex gap-3 items-center">
              <PriorityIcon value={priority} />
              <span>{selectedPriority?.label}</span>
            </div>

            <div>
              <ChevronDown />
            </div>
          </button>

          {priorityDropdown && (
            <div className="absolute flex flex-col w-full top-full left-0 z-20 rounded-lg border border-white/10 bg-[#1A1E24]">
              {issuePriority.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setPriority(option.value);
                    setPriorityDropdown(false);
                  }}

                  className=" flex items-center text-left px-4 py-2 gap-3 hover:bg-[#252B33] w-full"
                >
                  <PriorityIcon value={option.value} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/*members*/}

      {/* Assignee */}

      <div className="grid grid-cols-3 items-center gap-4">
        <div className="relative flex flex-col gap-3" ref={assigneeDropdownRef}>
          <h1>Assignee</h1>
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

            <ChevronDown size={16} className="shrink-0 text-[#8A8F98]" />
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

                {!assignee && <Check size={16} className="text-[#9B72F2]" />}
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
                      <Check size={13} strokeWidth={3} className="text-white" />
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

        <div className="flex flex-col gap-3">
          <span>Due Date</span>
          <DatePicker
            value={dueDate}
            onChange={setDueDate}
            placeholder="Set due date"
            minDate={minDate}
          />
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <span>Issue Tags</span>

          <Popover>
            <PopoverTrigger asChild>
              <button type="button"
                className="flex h-11 w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border  border-white/10 bg-[#191E22] px-3 text-left hover:border-white/20">
                {tags.length === 0 ? (
                  <span >
                    Add tags...
                </span>
                ) :
                  <>
                    <span>
                      {tags[0]}
                    </span>
                    {tags.length > 1 && (
                                 <span className="shrink-0 rounded-md bg-[#30334C] px-2 py-1 text-xs text-[#C4B5FD]">
                                   +{tags.length - 1}
                                 </span>
                               )}
                  </>
                  
                }
                <Plus/>
              </button>
              
            </PopoverTrigger>

            <PopoverContent>
              <div>
                <Tags />
                Manage Tags
              </div>

              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag()
                  }
                
                }} />

              {tags.length > 0 && (
                <div>
                  {tags.map((tag) => (
                    <div key={tag}>
                      <span>{tag}</span>
                      <button>
                        <X/>
                      </button>
                      
                    </div>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>
         
          
        </div>
      </div>
    </div>
  );
}
