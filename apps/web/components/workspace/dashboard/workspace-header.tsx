"use client";

import Image from "next/image";
import { useWorkspace } from "../workspace-context";
import { Ellipsis, UserRoundPlus } from "lucide-react";

export default function WorkspaceHeader() {
  const { name, logoUrl } = useWorkspace();

  const initials = name.trim().charAt(0).toUpperCase();

  const logoSrc =
    logoUrl?.startsWith("https://") || logoUrl?.startsWith("/")
      ? logoUrl
      : null;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between w-full">
        <div className="flex gap-6">
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            width={50}
            height={50}
            className="rounded-lg object-cover"
          />

          <div className="flex flex-col">
            <span className="text-sm text-[#565B65]">WORKSPACE</span>
            <span className="text-2xl font-bold">{name}</span>
            <span className="text-[#8A8F98]">workspace quote</span>

            <div className="flex flex-row gap-4 text-[#8A8F98]">
              <div>members</div>
              <div>project site</div>
              <div>workspace creation date</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-8">
            <div className="">members profile</div>
            <div className="flex flex-row gap-5">
              <div className="py-3 px-4 bg-[#0F1217] rounded-lg flex gap-6 items-center ">
                <UserRoundPlus />
                <div>Invite members</div>
              </div>
              <div className="py-3 px-4 bg-[#0F1217] rounded-lg flex gap-6 items-center">
                <Ellipsis />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className="flex justify-between">
          <div className="flex flex-col">logo</div>
          <div>
            <span>Projects</span>
            <div>project count</div>
            <div>data</div>
          </div>
          <div>graph</div>
        </div>

        
        <div className="flex justify-between">
          <div className="flex flex-col">logo</div>
          <div>
            <span>Projects</span>
            <div>project count</div>
            <div>data</div>
          </div>
          <div>graph</div>
        </div>

        
        <div className="flex justify-between">
          <div className="flex flex-col">logo</div>
          <div>
            <span>Projects</span>
            <div>project count</div>
            <div>data</div>
          </div>
          <div>graph</div>
        </div>

        
        <div className="flex justify-between">
          <div className="flex flex-col">logo</div>
          <div>
            <span>Projects</span>
            <div>project count</div>
            <div>data</div>
          </div>
          <div>graph</div>
        </div>
        
      </div>
      <div>Recent</div>
      <div>bottom</div>
    </div>
  );
}
