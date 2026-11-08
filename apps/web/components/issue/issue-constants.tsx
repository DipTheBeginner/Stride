import { Bug, ClipboardList, Sparkles, TrendingUp } from "lucide-react";

export type ProjectMember = {
  userId: string;
  user: {
    id: string;
    name: string;
    imageUrl: string | null;
    email: string | null;
  };
};


export const IssueStatuses = [
  { value: "TO_DO", label: "To Do", color: "#94A3B8" },
  { value: "IN_PROGRES", label: "In Progress", color: "#3B82F6" },
  { value: "REVIEW", label: "In Review", color: "#A78BFA" },
  { value: "DONE", label: "Done", color: "#22C55E" },
];

export const issueType = [
  { value: "TASK", label: "Task", icon: ClipboardList, color: "#94A3B8" },
  { value: "FEATURE", label: "Feature", icon: Sparkles, color: "#A78BFA" },
  { value: "BUG", label: "Bug", icon: Bug, color: "#EF4444" },
  { value: "IMPROVEMENT", label: "Improvement", icon: TrendingUp, color: "#22C55E" },
];

export const issuePriority = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  {value:"URGENT" , label:"Urgent"}
]


