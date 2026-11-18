import { Bookmark} from "lucide-react";
import { Issue } from "./issue.types";
import { issuePriority } from "./issue-constants";
import PriorityIcon from "../projects/priority-icon";
import UserAvatar from "../ui/user-avatra";
import { useDraggable } from "@dnd-kit/core";

type KanbanBoardIssueCardProps = {
  issue: Issue;
  projectKey: string;
  overlay?: boolean;
};


export function IssueCardContent({
  issue,
  projectKey,
  overlay = false,
}: KanbanBoardIssueCardProps) {
  const priority = issuePriority.find((item) => item.value === issue.priority,);

  return (
    <div
          className={`w-full rounded-lg border bg-[#23262E] p-3 ${
            overlay
              ? "border-blue-400/50 shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-blue-400/20"
              : "border-[#343842]"
          }`}
        >
          <div className="flex gap-5">
            <Bookmark size={20} className="text-zinc-400" />
    
            <div className="flex flex-1 flex-col gap-3">
              <span className="text-sm text-zinc-500">
                {projectKey && issue.number != null
                  ? `${projectKey}-${issue.number}`
                  : "—"}
              </span>
    
              <span className="text-lg capitalize">{issue.title}</span>
    
              <div className="flex flex-wrap items-center gap-2">
                {issue.labels.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
    
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <PriorityIcon value={issue.priority} />
    
                  <span
                    style={{ color: priority?.color }}
                    className="text-sm"
                  >
                    {priority?.label}
                  </span>
                </div>
    
                <div className="mr-4">
                  <UserAvatar
                    size={25}
                    imageUrl={issue.assignee?.imageUrl ?? null}
                    name={issue.assignee?.name ?? "u"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}




export default function KanbanBoardIssueCard({
  issue,
  projectKey,
}: KanbanBoardIssueCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: issue.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab touch-none active:cursor-grabbing"
      style={{
        opacity: isDragging ? 0.25 : 1,
      }}
    >
      <IssueCardContent
        issue={issue}
        projectKey={projectKey}
      />
    </div>
  );
}