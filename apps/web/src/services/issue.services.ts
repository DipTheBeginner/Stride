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



export type CreateIssueInput = {
  title: string;
   description: string;
   type: string;
   status: Issue["status"];
   priority: string;
   assigneeId: string | null;
   dueDate: string | null;
   labels: string[];
}


export async function createIssue(
  projectId: string,
  input:CreateIssueInput,
): Promise<Issue>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${encodeURIComponent(projectId)}/issue`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":"application/json",
    },
    body:JSON.stringify(input)
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create Issue");
  }

  return data.issue
}
