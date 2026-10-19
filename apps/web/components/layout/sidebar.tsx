import Image from "next/image";
import { ChevronDown } from "lucide-react";

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

  return (
    <div className="bg-[#010101] min-h-screen">
      <div className="flex gap-3 items-center p-4">
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

      <div className="flex">
        {workspace.logoUrl ? (
          <Image
            src={workspace.logoUrl}
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
        <ChevronDown size={20} />
      </div>

      <div className="flex flex-col">
        <span>Home</span>
        <span>Projects</span>
        <span>Task</span>
        <span>agents</span>
        <span>File</span>
        <span>memebrs</span>
        <span>Settings</span>
      </div>

      <div>
        <span>User</span>
      </div>
    </div>
  );
}
