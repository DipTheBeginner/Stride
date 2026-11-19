import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Issue } from "./issue.types";
import KanbanBoardIssueCard, { IssueCardContent } from "./kanbanboard-issue-card";
import { useState } from "react";
import { createPortal } from "react-dom";

type KanbanBoardProps = {
  issues: Issue[];
  projectKey: string;
  onIssueStatusChange: (
      issueId: string,
      newStatus: Issue["status"]
    ) => void;
};

const columns = [
  { status: "BACKLOG", label: "Backlog", color: "#71717A" },
  { status: "TO_DO", label: "To Do", color: "#94A3B8" },
  { status: "IN_PROGRESS", label: "In Progress", color: "#3B82F6" },
  { status: "REVIEW", label: "In Review", color: "#A78BFA" },
  { status: "DONE", label: "Done", color: "#22C55E" },
] as const;

type KanbanColumnProps = {
  column: (typeof columns)[number];
  issues: Issue[];
  projectKey: string;
};

function KanbanColumn({ column, issues, projectKey }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-0 min-w-0 rounded-t-xl transition-colors ${
        isOver ? "ring-1 ring-blue-500/50" : ""
      }`}
    >
      <div className="p-4 flex flex-col h-full min-h-0 rounded-t-xl bg-[#181A20] gap-4">
        <div className="flex justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <h3 className="text-sm font-medium">{column.label}</h3>
          </div>
          <span>{issues.length}</span>
        </div>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col gap-3">
            {issues.map((issue) => (
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
}

export default function KanbanBoard({ issues, projectKey,onIssueStatusChange }: KanbanBoardProps) {
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const activeIssue = issues.find((issue) => issue.id === activeIssueId);

  function handleDragStart(event: DragStartEvent) {
    setActiveIssueId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveIssueId(null);

    if (!over) return;

    const issueId = String(active.id);
    const newStatus = String(over.id) as Issue["status"];

    const draggedIssue = issues.find((issue) => issue.id === issueId);

    if (!draggedIssue) return;

    if (draggedIssue.status === newStatus) return;

    onIssueStatusChange(issueId, newStatus);

    
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveIssueId(null)}
    >
      <div className="grid h-full min-h-0 grid-cols-5 gap-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            column={column}
            issues={issues.filter((issue) => issue.status === column.status)}
            projectKey={projectKey}
          />
        ))}
      </div>

      {typeof document !== "undefined" && 
        createPortal(
                <DragOverlay zIndex={9999} dropAnimation={null}>
                  {activeIssue ? (
                    <div className="w-65 rotate-[1.5deg] scale-[1.03]">
                      <IssueCardContent
                        issue={activeIssue}
                        projectKey={projectKey}
                        overlay
                      />
               
                    </div>
                  ) : null}
                </DragOverlay>,
                document.body,
              )}
    </DndContext>

    
  );
}
