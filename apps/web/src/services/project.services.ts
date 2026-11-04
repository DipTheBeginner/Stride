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
