"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  FolderKanban,
  FolderUser,
  Home,
  Inbox,
  Layers,
  Minus,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react";
import SidebarNavItems from "./Sidebar-NavItems";
import { useState } from "react";

type SidebarProps = {
  workspace: {
    name: string;
    logoUrl: string | null;
  };
};

export default function Sidebar({ workspace }: SidebarProps) {
  const initials = workspace.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const logoSrc =
    workspace.logoUrl?.startsWith("https://") ||
    workspace.logoUrl?.startsWith("/")
      ? workspace.logoUrl
      : null;

  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(true);

  return (
    <div className="bg-[#010101] min-h-screen flex flex-col">
      <div className="flex gap-3 items-center ">
        <Image
          className="rounded-xl"
          src="/stride.webp"
          alt="Stride logo"
          width={50}
          height={50}
          priority
        />
        <span>Stride</span>
      </div>

      <div className="flex justify-between p-4">
        <div className="flex gap-4 items-center">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={`${workspace.name} logo`}
              width={36}
              height={36}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#343A55] font-semibold text-white">
              {initials}
            </div>
          )}
          <div className="flex flex-col">
            <div>{workspace.name.toUpperCase()} Workspace</div>
            <span className="text-sm font-medium text-[#F7F8F8]">
              workspace
            </span>
          </div>
        </div>
        <ChevronsUpDown size={20} />
      </div>

      <div className="mx-4 my-2 border-t border-white/10" />
      <div className="flex flex-col px-4">
        <SidebarNavItems name="Home" icon={Home} href="/raj" />
        <SidebarNavItems name="Inbox" icon={Inbox} href="/raj" />
        <SidebarNavItems name="Search" icon={Search} href="/raj" />
        <SidebarNavItems name="My issues" icon={Layers} href="/raj" />
      </div>

      <div className="mx-4 my-2 border-t border-white/10" />

      <div className="px-4">
        <button
          type="button"
          onClick={() => setWorkspaceOpen((prev) => !prev)}
          aria-expanded={workspaceOpen}
          className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-white/10 text-sm text-[#565B65] hover:text-[#8A8F98]"
        >
          <span>Workspace</span>
          {workspaceOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
            workspaceOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden" inert={!workspaceOpen}>
            <SidebarNavItems name="Teams" icon={FolderUser} href="/raj" />
            <SidebarNavItems name="Members" icon={Users} href="/raj" />
            <SidebarNavItems name="Projects" icon={FolderKanban} href="/raj" />
          </div>
        </div>
      </div>

      <div className="mx-4 my-2 border-t border-white/10" />

      <div className="px-4">
        <button
          type="button"
          onClick={() => setTeamsOpen((prev) => !prev)}
          aria-expanded={teamsOpen}
          className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-white/10 text-sm text-[#565B65] hover:text-[#8A8F98]"
        >
          <span>Teams</span>
          {teamsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
            teamsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <SidebarNavItems name="Team" icon={FolderUser} href="/raj" />
            <SidebarNavItems name="Issues" icon={Users} href="/raj" />
            <SidebarNavItems name="Project" icon={FolderKanban} href="/raj" />
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-white/20 p-4">
        <div className="flex gap-4">
          <User />
          <span>{workspace.name}</span>
        </div>
      </div>
    </div>
  );
}
