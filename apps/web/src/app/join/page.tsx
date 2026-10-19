"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Join() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleNameChange(value: string) {
    setName(value);

    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    setSlug(generateSlug(value));
  }

  async function handleCreateWorkspace() {
    if (!name.trim() || !slug.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/workspaces/createworkspace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || "Failed to create workspace");
        setLoading(false);
        return;
      }

      const workspaceSlug = data.workspace?.slug || data.slug || slug;
      router.push(`/${workspaceSlug}`);
    } catch (error) {
      console.error("Workspace creation failed:", error);
      setError("Unable to connect to server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-[#0D0E0E]">
      <div className="flex flex-col items-center justify-center gap-3 max-w-[380px] w-full  ">
        <span className="text-2xl font-semibold">Create a workspace</span>
        <span className="text-center text-sm text-[#8A8F98]">
          Move Work forward across teams and agents
        </span>

        <div className="flex flex-col w-full gap-1 mt-6">
          <span className="text-xs text-[#8A8F98]">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="rounded-lg bg-[#121213] p-2 border border-[#363943] outline-none focus:border-blue-500"
          />
        </div>

        <div className=" flex flex-col w-full mt-6">
          <span className="text-xs text-[#8A8F98]">URL</span>
          <div className="flex flex-row  w-full py-2">
            <span className="bg-[#1B1B1C] p-2 rounded-bl-lg rounded-tl-lg text-[#949597] border border-[#363943] ">
              stride.app/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="bg-[#121213] flex-1 w-full  rounded-tr-lg rounded-br-lg outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="w-full rounded-md border border-red-500/20 bg-red-500/10 p-2 text-center text-xs text-red-400">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleCreateWorkspace}
          className=" rounded-full w-full mt-10 bg-[#1B1B1C] p-2 border-[#363943]"
          disabled={loading || !name.trim() || !slug.trim()}
        >
          {loading ? "Creating workspace..." : "Create workspace"}
        </button>
      </div>
    </div>
  );
}
