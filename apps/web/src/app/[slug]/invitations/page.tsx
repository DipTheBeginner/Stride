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
        setLoading(false)
      }
    }

    fetchInvitations();
  },[]);

  return (
    <div className="p-8">
      <div>
        <Mail />
        <div>
          <span>Workspace Invitations</span>
          <span>You have been invited to join these workspaces</span>
        </div>
      </div>

      <div>
        <div>
          <div>3 pending invitations</div>
          <div>sort by recent</div>
        </div>
      </div>

      <div>
           <h1>Workspace Invitations</h1>
     
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
  );
}
