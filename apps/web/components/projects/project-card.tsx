import { Globe } from "lucide-react";


export default function ProjectCard() {

  return (
    <div className="flex">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/20">
          <Globe size={25} className="text-violet-400" strokeWidth={2.3} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-md font-semibold">Project Name</span>
          <div className="text-sm text-[#565B65]">Project descreption</div>
        </div>
        <div className="flex flex-col">
          <div>
            statuses
          </div>
          <div>Members logo</div>
          
        </div>
        <div className="flex flex-col">
          <div>completion bar</div>
          <div className="flex">
            <div>task number</div>
            <div>completion percentage</div>
          </div>
        </div>
        <div>
          settings
        </div>
      </div>
    </div>
  )
}