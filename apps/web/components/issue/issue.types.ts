export type Issue = {
  id: string;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  type: "TASK" | "BUG" | "FEATURE" | "IMPROVEMENT";
  tags: string[];
  number: number | null;
  projectId: string;
  assigneeId: string | null;
  assignee: {
    id: string;
    name: string;
    imageUrl: string | null;
  } | null;
  createdBy: {
    id: string;
    name: string;
  } | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};