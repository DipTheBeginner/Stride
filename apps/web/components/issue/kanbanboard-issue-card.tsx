import { Bookmark, Flag } from "lucide-react";
import { Issue } from "./issue.types";
import { issuePriority } from "./issue-constants";
import PriorityIcon from "../projects/priority-icon";
import UserAvatar from "../ui/user-avatra";

type KanbanBoardIssueCardProps = {
  issue: Issue;
  projectKey: string;
};

export default function KanbanBoardIssueCard({
  issue,
  projectKey,
}: KanbanBoardIssueCardProps) {
  console.log("Project Key:", projectKey);
  console.log("Issue Number:", issue.number);
  console.log("Full Issue:", issue);

  const priority = issuePriority.find(
    (item) => item.value === issue.priority
  );

  return (
    <div className="p-3 border bg-[#1C1E28] rounded-md w-full">
      <div className="flex gap-5">
        <Bookmark size={20} className="text-zinc-400" />

        <div className="flex flex-col gap-3 flex-1">
          <span className="text-sm text-zinc-500">
            {projectKey && issue.number != null
              ? `${projectKey}-${issue.number}`
              : "—"}
          </span>
          <span className="capitalize text-lg">{issue.title}</span>
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

          <div className="flex items-center gap-2 justify-between">

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
              

            <UserAvatar size={25} imageUrl={issue.assignee?.imageUrl ?? null} name={issue.assignee?.name ?? "u"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
