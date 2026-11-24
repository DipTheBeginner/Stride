import { CreateProjectUpdateInput, ProjectUpdate } from "@/types/project-update";
import { Project } from "../../components/projects/projects-context";

export async function getProjectById(projectId: string): Promise<Project> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const data = await response.json();

  return data.project;
}


export async function getAvailableProjectMembers(projectId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/available-members`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch available project members");
  }

  const data = await response.json();

  return data.availableMembers;
}

export async function addProjectMembers(
  projectId: string,
  memberIds: string[],
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ memberIds }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add project members");
  }

  const data = await response.json();

  return data.members;
}


export async function createProjectUpdate(
  projectId: string,
  data: CreateProjectUpdateInput,
): Promise<ProjectUpdate> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/postupdate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create project update");
  }

  return result.projectUpdate;
}

export async function getProjectUpdates(
  projectId: string,
): Promise<ProjectUpdate[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/updates`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch project updates");
  }

  return result.projectUpdates;
}


export async function getLatestProjectUpdate(
  projectId: string,
): Promise<ProjectUpdate | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/updates/latest`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch latest project update");
  }

  return result.latestUpdate;
}