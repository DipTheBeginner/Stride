export type WorkspaceMember = {
  userId: string;
  user: {
    id: string;
    name: string;
    imageUrl: string | null;
    email: string | null;
  };
};

export const projectStatuses = [
  { value: "PLANNED", label: "Planned", color: "#94A3B8" },
  { value: "IN_PROGRESS", label: "In Progress", color: "#3B82F6" },
  { value: "ON_HOLD", label: "On Hold", color: "#F59E0B" },
  { value: "COMPLETED", label: "Completed", color: "#22C55E" },
];

export const projectPriorities = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

export const projectColors = [
  "#9B72F2",
  "#328FF0",
  "#32C48D",
  "#F97345",
  "#F43F5E",
  "#EAB308",
  "#06B6D4",
  "#EC4899",
];