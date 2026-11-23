"use client";

import { useMemo, useState } from "react";
import { Search, UserPlus, UsersRound, X, Check } from "lucide-react";

import UserAvatar from "../ui/user-avatra";
import {
  
  useAddProjectMembers,
  useAvilableProjectMembers,
} from "@/hooks/use-project";

type AddProjectMembersDialogProps = {
  projectId: string;
  onClose: () => void;
};

export default function AddProjectMembersDialog({
  projectId,
  onClose,
}: AddProjectMembersDialogProps) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: availableMembers = [],
    isPending: isLoading,
    isError,
  } = useAvilableProjectMembers(projectId);

  const {
    mutateAsync: addMembers,
    isPending: isAdding,
  } = useAddProjectMembers(projectId);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return availableMembers.filter((member) => {
      return (
        member.name?.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
      );
    });
  }, [availableMembers, search]);

  function toggleMember(memberId: string) {
    setSelectedIds((previous) =>
      previous.includes(memberId)
        ? previous.filter((id) => id !== memberId)
        : [...previous, memberId],
    );
  }

  async function handleAddMembers() {
    if (selectedIds.length === 0 || isAdding) return;

    try {
      await addMembers(selectedIds);
      onClose();
    } catch (error) {
      console.error("Failed to add project members:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-members-title"
        className="flex w-full max-w-115 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111115] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pb-5 pt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/10">
              <UsersRound size={19} className="text-violet-400" />
            </div>

            <div>
              <h2
                id="add-members-title"
                className="text-base font-semibold text-zinc-100"
              >
                Add project members
              </h2>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Select people from your workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            disabled={isAdding}
            className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/5 hover:text-zinc-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-violet-500/50">
            <Search size={17} className="shrink-0 text-zinc-500" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* List heading */}
        <div className="flex items-center justify-between px-6 pb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Available members
          </span>

          <span className="text-xs text-zinc-600">
            {availableMembers.length} people
          </span>
        </div>

        {/* Members list */}
        <div className="max-h-75 min-h-30 space-y-1.5 overflow-y-auto px-4 pb-5">
          {isLoading ? (
            <p className="px-2 py-8 text-center text-sm text-zinc-500">
              Loading members...
            </p>
          ) : isError ? (
            <p className="px-2 py-8 text-center text-sm text-red-400">
              Failed to load workspace members
            </p>
          ) : filteredMembers.length === 0 ? (
            <p className="px-2 py-8 text-center text-sm text-zinc-500">
              {search
                ? "No matching members found"
                : "All workspace members are already in this project"}
            </p>
          ) : (
            filteredMembers.map((member) => {
              const selected = selectedIds.includes(member.id);

              return (
                <button
                  key={member.id}
                  type="button"
                  disabled={isAdding}
                  onClick={() => toggleMember(member.id)}
                  aria-pressed={selected}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    selected
                      ? "border-violet-500/30 bg-violet-500/8"
                      : "border-transparent hover:border-white/10 hover:bg-white/4"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-800">
                    <UserAvatar
                      imageUrl={member.imageUrl}
                      name={member.name ?? member.email}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {member.name ?? "Unnamed member"}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {member.email}
                    </p>
                  </div>

                  <div
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-colors ${
                      selected
                        ? "border-violet-500 bg-violet-500 text-white"
                        : "border-zinc-600"
                    }`}
                  >
                    {selected && <Check size={13} strokeWidth={3} />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.015] px-6 py-4">
          <span className="text-xs text-zinc-500">
            {selectedIds.length} selected
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isAdding}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAddMembers}
              disabled={selectedIds.length === 0 || isAdding}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <UserPlus size={15} />
              {isAdding
                ? "Adding..."
                : `Add ${selectedIds.length} ${
                    selectedIds.length === 1 ? "member" : "members"
                  }`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}