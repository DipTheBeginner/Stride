"use client";

import formatInvitationDate from "@/lib/format-date";
import Image from "next/image";

interface InvitationCardProps {
  name: string;
  logoUrl: string | null;
  inviterName: string;
  inviterImageUrl: string | null;
  createdAt: string;
}

export default function InvitationCard({
  name,
  logoUrl,
  inviterName,
  inviterImageUrl,
  createdAt,
}: InvitationCardProps) {
  const logoSrc =
    logoUrl?.startsWith("https://") || logoUrl?.startsWith("/")
      ? logoUrl
      : null;

  return (
    <div className="flex justify-between bg-[#12151E] rounded-lg border p-6 border-slate-600 border-">
      <div className="flex gap-4">
        <Image
          src={logoSrc}
          alt={`${name} logo`}
          width={50}
          height={50}
          className="rounded-lg object-cover p-"
        />
        <div className="">
          <span className="capitalize text-lg font-bold">{name}</span>
          <div className="flex mt-2 gap-4">
            {inviterImageUrl ? (
              <Image
                src={inviterImageUrl}
                alt={`${inviterName} profile`}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-700 text-xs">
                {inviterName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex items-center gap-3 text-sm">
              <div>
                <span>Invited by </span>
                <span className="capitalize">{inviterName}</span>
              </div>
            
              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />
            
              <span>{formatInvitationDate(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center px-8">
        <button className="bg-blue-600 rounded-lg px-8 py-3 ">Accept</button>
        <button className="bg-[#11141E] rounded-lg p-8 py-3 border-slate-500 border">
          Reject
        </button>
      </div>
    </div>
  );
}
