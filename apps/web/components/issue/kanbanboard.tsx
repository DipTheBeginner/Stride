import type { Issue } from "./issue.types";
import KanbanBoardIssueCard from "./kanbanboard-issue-card";

type KanbanBoardProps = {
  issues: Issue[];
  projectKey: string;
};

const columns = [
  { status: "TO_DO", label: "To Do", color: "#94A3B8" },
  { status: "IN_PROGRESS", label: "In Progress", color: "#3B82F6" },
  { status: "REVIEW", label: "In Review", color: "#A78BFA" },
  { status: "DONE", label: "Done", color: "#22C55E" },
] as const;

export default function KanbanBoard({ issues, projectKey }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((item) => {
        const columnIssue = issues.filter(
          (issue) => issue.status === item.status,
        );

        return (
          <div key={item.status}>
            <div className="rounded-xl bg-[#1B1E23] p-4 flex flex-col justify-between">
              <div className="flex">
                <span className="h-2.5 w-2.5 rounded-fulll" />
                <h3>{item.label}</h3>
              </div>

              <span className="">{columnIssue.length}</span>

            <div className=" mt-3 flex gap-3 flex-col">
              {columnIssue.map((issue) => (
                <KanbanBoardIssueCard
                  key={issue.id}
                  issue={issue}
                  projectKey={projectKey}
                />
              ))}
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
