"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkspaceLogoUpload({ slug }: { slug: string }) {
  const [upload, setUpload] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmitLogo(file: File) {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Only png jepg webp image types are allowed");
      return;
    }

    const formData = new FormData();

    formData.append("logo", file);

    try {
      setUpload(true);
      setMessage("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${encodeURIComponent(slug)}/logo`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Logo upload failed");
      }

      setMessage("Logo upload successfuly");
      window.location.reload();
    } catch (error) {
      setMessage("Failed to upload logo");
    } finally {
      setUpload(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="cursor-pointer rounded-lg border border-[#363943] px-4 py-2 w-fit">
        {upload ? "Uploading..." : "Change workspace logo"}

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          disabled={upload}
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) void handleSubmitLogo(file);

            event.target.value = "";
          }}
        />
      </label>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
