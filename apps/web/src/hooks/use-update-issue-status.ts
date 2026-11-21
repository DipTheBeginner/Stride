
"use client";

import { updateIssueStatus } from "@/services/issue.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Issue } from "../../components/issue/issue.types";

type UpdateStatusInput = {
  issueId: string;
  status: Issue["status"];
};

export function useUpdateIssueStatus(projectId: string) {
  const queryClient = useQueryClient();

  const queryKey = ["issues", projectId];

  return useMutation({  
    mutationFn: ({ issueId, status }: UpdateStatusInput) =>
      updateIssueStatus(projectId, issueId, status),

    onMutate: async ({ issueId, status }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousIssues = queryClient.getQueryData<Issue[]>(queryKey);

      queryClient.setQueryData<Issue[]>(queryKey, (old = []) =>
        old.map((issue) =>
          issue.id === issueId ? { ...issue, status } : issue,
        ),
      );

      return { previousIssues };
    },

    onError: (error, _variables, context) => {
      if (context?.previousIssues) {
        queryClient.setQueryData(queryKey, context.previousIssues);
      }

      console.error("Failed to update issue status:", error);
    },

    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey });
    },
  });
}
