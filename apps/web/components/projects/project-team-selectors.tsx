"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import UserAvatar from "../ui/user-avatra";
import { WorkspaceMember } from "./project-constants";

type ProjectTeamSelectorsProps = {
  members: WorkspaceMember[];
  currentUser: { id: string; name?: string; imageUrl?: string | null } | null;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string) => void;
  selectedMemberIds: string[];
  setSelectedMemberIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ProjectTeamSelectors({
  members,
  currentUser,
  selectedLeadId,
  setSelectedLeadId,
  selectedMemberIds,
  setSelectedMemberIds,
}: ProjectTeamSelectorsProps) {
  const [leadDropdownOpen, setLeadDropdownOpen] = useState(false);
  const [membersDropdownOpen, setMembersDropdownOpen] = useState(false);

  const leadDropdownRef = useRef<HTMLDivElement>(null);
  const memberDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (leadDropdownRef.current && !leadDropdownRef.current.contains(target)) {
        setLeadDropdownOpen(false);
      }
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(target)) {
        setMembersDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedLead = members.find(
    (member) => member.userId === (selectedLeadId ?? currentUser?.id),
  );

  const selectedMemberDetails = members.filter(
    (member) =>
      selectedMemberIds.includes(member.userId) &&
      member.userId !== currentUser?.id,
  );

  const visibleMembers = selectedMemberDetails.slice(0, 7);
  const hiddenMembers = selectedMemberDetails.length - visibleMembers.length;

  return (
    <>
      {/* Project Lead */}
      <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Project Lead</span>
        <span className="text-sm text-[#8A8F98]">
          Select a member to lead this project
        </span>

        <div ref={leadDropdownRef} className="relative mt-2">
          <button
            type="button"
            onClick={() => setLeadDropdownOpen(!leadDropdownOpen)}
            className="mt-2 flex w-full cursor-pointer justify-between rounded-lg bg-[#1A1E24] p-2"
          >
            <div className="flex items-center justify-center gap-2">
              <UserAvatar
                name={selectedLead?.user.name ?? currentUser?.name ?? "user"}
                imageUrl={selectedLead?.user.imageUrl ?? currentUser?.imageUrl}
                size={30}
              />
              <span className="capitalize">
                {selectedLead?.user.name ?? currentUser?.name ?? "You"}
              </span>
            </div>
            <ChevronDown />
          </button>

          {leadDropdownOpen && (
            <div className="absolute top-full left-0 z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#1A1E24] shadow-xl">
              {members.map((member) => (
                <button
                  key={member.userId}
                  type="button"
                  onClick={() => {
                    setSelectedLeadId(member.userId);
                    setLeadDropdownOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 p-3 text-left hover:bg-[#252B33]"
                >
                  <UserAvatar
                    name={member.user.name}
                    imageUrl={member.user.imageUrl}
                    size={30}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm capitalize">
                      {member.user.name}
                      {member.userId === currentUser?.id && " (You)"}
                    </span>
                    {member.user.email && (
                      <span className="text-xs text-[#8A8F98]">
                        {member.user.email}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Members */}
      <div className="flex flex-col gap-3">
        <span className="text-md font-semibold">Project Members</span>
        <div className="mt-3 flex items-center gap-3">
          <UserAvatar
            name={currentUser?.name ?? "User"}
            imageUrl={currentUser?.imageUrl}
            size={34}
          />

          {visibleMembers.map((memberDetails) => (
            <div key={memberDetails.userId}>
              <UserAvatar
                name={memberDetails.user.name}
                imageUrl={memberDetails.user.imageUrl}
              />
            </div>
          ))}

          {hiddenMembers > 0 && (
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#302742] text-xs font-semibold text-[#C4A7FF]">
              +{hiddenMembers}
            </div>
          )}

          <div ref={memberDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setMembersDropdownOpen(!membersDropdownOpen)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-dotted border-[#9B72F2]"
            >
              <Plus size={18} className="text-[#9B72F2]" />
            </button>

            {membersDropdownOpen && (
              <div className="absolute top-full left-0 z-50 mt-2 max-h-64 w-72 overflow-y-auto rounded-xl border border-[#30343B] bg-[#1C1F26] p-3 shadow-xl">
                {members
                  .filter((member) => member.userId !== currentUser?.id)
                  .map((member) => (
                    <button
                      key={member.userId}
                      type="button"
                      onClick={() => {
                        setSelectedMemberIds((prev) =>
                          prev.includes(member.userId)
                            ? prev.filter((id) => id !== member.userId)
                            : [...prev, member.userId],
                        );
                      }}
                      className="flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-[#30343B]"
                    >
                      <UserAvatar
                        name={member.user.name}
                        imageUrl={member.user.imageUrl}
                        size={30}
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-sm font-medium text-white capitalize">
                          {member.user.name}
                        </span>
                        <span className="truncate text-xs text-[#8A8F98]">
                          {member.user.email}
                        </span>
                      </div>

                      {selectedMemberIds.includes(member.userId) && (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9B72F2]">
                          <Check size={13} strokeWidth={3} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}