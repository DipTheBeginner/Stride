import type { Issue } from "./issue.types";
import KanbanBoardIssueCard from "./kanbanboard-issue-card";

type KanbanBoardProps = {
  issues: Issue[];
  projectKey: string;
};

const columns = [
  { status: "BACKLOG", label: "Backlog", color: "#71717A" },
  { status: "TO_DO", label: "To Do", color: "#94A3B8" },
  { status: "IN_PROGRESS", label: "In Progress", color: "#3B82F6" },
  { status: "REVIEW", label: "In Review", color: "#A78BFA" },
  { status: "DONE", label: "Done", color: "#22C55E" },
] as const;

export default function KanbanBoard({ issues, projectKey }: KanbanBoardProps) {
  return (
    <div className="grid h-full min-h-0 grid-cols-5 gap-4">
      {columns.map((item) => {
        const columnIssue = issues.filter(
          (issue) => issue.status === item.status,
        );

        return (
          <div key={item.status} className="min-h-0 min-w-0">
            <div className="p-4 flex flex-col h-full min-h-0 rounded-t-xl bg-[#181A20] gap-4">
              <div className="flex justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                
                  <h3 className="text-sm font-medium">{item.label}</h3>
                </div>
                <span className="">{columnIssue.length}</span>
              </div>

              <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="flex flex-col gap-3">
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
          </div>
        );
      })}
    </div>
  );
}
