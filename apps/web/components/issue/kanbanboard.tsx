import type { Issue } from "./issue.types";
import KanbanBoardIssueCard from "./kanbanboard-issue-card";

type KanbanBoardProps = {
  issues: Issue[];
};

const columns = [
  { status: "TO_DO", label: "To Do", color: "#94A3B8" },
  { status: "IN_PROGRESS", label: "In Progress", color: "#3B82F6" },
  { status: "REVIEW", label: "In Review", color: "#A78BFA" },
  { status: "DONE", label: "Done", color: "#22C55E" },
] as const;

export default function KanbanBoard({ issues }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cloumns.map((item) => {
        
      })
        
      }
      
      
    </div>
  );
}