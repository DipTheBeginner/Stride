"use client";

import { useState } from "react";
import { useWorkspace } from "../workspace-context";

type WorkspaceInviteProps = {
  onClose: () => void;
};

export default function WorkspaceInvite({
  onClose,
}: WorkspaceInviteProps) {
  const { slug } = useWorkspace();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleInvite() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${encodeURIComponent(slug)}/addmember`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add member");
      }

      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-[#343842] bg-[#17191F] p-6">
        <h2 className="text-xl font-semibold">
          Add Workspace Member
        </h2>

        <label htmlFor="member-email" className="text-sm text-[#A1A1AA]">
          Email
        </label>

        <input
          id="member-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user's email"
          className="rounded-lg border border-[#343842] bg-[#0F1217] px-3 py-2 outline-none"
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            onClick={handleInvite}
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Member"}
          </button>
        </div>
      </div>
    </div>
  );
}