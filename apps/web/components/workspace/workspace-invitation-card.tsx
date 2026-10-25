"use client";

import { LetterText } from "lucide-react";
import { useWorkspace } from "./workspace-context";
import Image from "next/image";


interface InvitationCardProps{
  name: string,
  logoUrl: string | null,
  inviterName: string,
  inviterImageUrl: string | null,
  createdAt: string
  
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
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Image
          src={logoSrc}
          alt={`${name} logo`}
          width={50}
          height={50}
          className="rounded-lg object-cover"
        />
        <div className="">
          <span className="capitalize text-lg font-bold">{name}</span>
          <div>
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
            <span>Invited by {inviterName}</span>
            <span>duration</span>
          </div>
        </div>
      </div>
      <div>
        <button>Accept</button>
        <button>Reject</button>
      </div>
    </div>
  );
}
