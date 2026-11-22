import { createIssue, CreateIssueInput } from "@/services/issue.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";






export function useCreateIssue(projectId: string) {


  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (input: CreateIssueInput) => createIssue(projectId, input),

    onSuccess: (newIssue) => {
      queryClient.setQueryData<Issue[]>(
        ["issues", projectId],
        (old = [])=>[...old , newIssue]
      )
    }
  })
}