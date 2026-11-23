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
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/available-members`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ memberIds }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add project members");
  }

  const data = await response.json();

  return data.members;
}