export const statusConfig = {
  PLANNED: {
    label: "Planned",
  },
  ACTIVE: {
    label: "Active",
  },
  ON_HOLD: {
    label: "On hold",
  },
  COMPLETED: {
    label: "Completed",
  },
  CANCELLED: {
    label: "Cancelled",
  },
};

export const priorityConfig = {
  LOW: {
    label: "Low",
  },
  MEDIUM: {
    label: "Medium",
  },
  HIGH: {
    label: "High",
  },
  URGENT: {
    label: "Urgent",
  },
};

export type ProjectStatus = keyof typeof statusConfig;
export type ProjectPriority = keyof typeof priorityConfig;