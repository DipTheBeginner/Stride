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




export async function updateIssueStatus(
  projectId: string,
  issueId: string,
  status: Issue["status"],
): Promise<Issue> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/issues/${encodeURIComponent(issueId)}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update issue status");
  }

  return data.issue;
}
