export type ProjectHealth = "ON_TRACK" | "AT_RISK" | "OFF_TRACK";

export interface ProjectUpdate {
  id: string;
  content: string;
  health: ProjectHealth;
  projectId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;

  author: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
}

export interface CreateProjectUpdateInput {
  content: string;
  health: ProjectHealth;
}