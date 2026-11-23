import { addProjectMembers, getAvailableProjectMembers, getProjectById } from "@/services/project.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export function useProject(projectId: string) {

  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled:Boolean(projectId)
  })
}


export function useAvilableProjectMembers(projectId: string) {
  return useQuery({
    queryKey: ["avilable-project-members", projectId],
    queryFn: () => getAvailableProjectMembers(projectId),
    enabled: Boolean(projectId)
  })
}


export function useAddProjectMembers(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberIds: string[]) =>
      addProjectMembers(projectId, memberIds),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["available-project-members",projectId]
      })

      queryClient.invalidateQueries({
        queryKey:["project",projectId]
      })

      queryClient.invalidateQueries({
        queryKey:["project-members",projectId]
      })
      }
  })
}