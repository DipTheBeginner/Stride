export const statusConfig = {
  PLANNED: {
    label: "Planned",
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/10",
  },
  ACTIVE: {
    label: "Active",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  ON_HOLD: {
    label: "On hold",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  COMPLETED: {
    label: "Completed",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  CANCELLED: {
    label: "Cancelled",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

export const priorityConfig = {
  LOW: {
    label: "Low",
    textColor: "text-slate-400",
    bgColor: "bg-slate-500/10",
  },
  MEDIUM: {
    label: "Medium",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  HIGH: {
    label: "High",
    textColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  URGENT: {
    label: "Urgent",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

export type ProjectStatus = keyof typeof statusConfig;
export type ProjectPriority = keyof typeof priorityConfig;