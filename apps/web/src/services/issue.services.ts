import { Issue } from "../../components/issue/issue.types";


export async function getProjectIssue(projectId: string):Promise<Issue[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/getIssue`, {
    method: "GET",
    credentials: "include",
    
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get message")
    
  }

  return data.getIssue;
}