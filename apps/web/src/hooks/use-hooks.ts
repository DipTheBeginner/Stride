import { getProjectIssue } from "@/services/issue.services";
import { getProjectById } from "@/services/project.services";
import { useQuery } from "@tanstack/react-query";




export function useIssues(projectId: string) {
  return useQuery({
    queryKey: ["issues", projectId],
    queryFn: () => getProjectIssue(projectId),
    enabled: Boolean(projectId),
  });
}


