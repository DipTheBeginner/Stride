"use client";

import { Mail } from "lucide-react";
import InvitationCard from "../../../../components/workspace/workspace-invitation-card";
import { useEffect, useState } from "react";

interface Invitation {
  id: string;
  createdAt: string;
  workspace: {
    name: string;
    logoUrl: string | null;
  };
  invitedBy: {
    name: string;
    imageUrl: string | null;
  };
}

export default function WorkspaceInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvitations() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workspaces/invitation/mine`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch invitations");
        }

        const data = await response.json();
        setInvitations(data.invitations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchInvitations();
  }, []);

  return (
    <div className="p-8">
      <div className="flex gap-4">
        <div className="bg-[#171B27] p-4 px-6 items-center flex rounded-lg">
          <Mail size={25} className="" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold">Workspace Invitations</span>
          <span className="text-md font-normal text-slate-300 ">
            You have been invited to join these workspaces
          </span>
        </div>
      </div>

      <div className="mt-8 bg-[#141522] p-6 rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-2 text-lg">
            <span>{invitations.length}</span>

            <div>pending invitations</div>
          </div>
          <div>sort by recent</div>
        </div>

      <div className="mt-8">

        {invitations.map((invitation) => (
          <InvitationCard
            key={invitation.id}
            name={invitation.workspace.name}
            logoUrl={invitation.workspace.logoUrl}
            inviterName={invitation.invitedBy.name}
            inviterImageUrl={invitation.invitedBy.imageUrl}
            createdAt={invitation.createdAt}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
