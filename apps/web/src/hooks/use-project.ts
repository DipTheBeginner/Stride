import { addProjectMembers, createProjectUpdate, getAvailableProjectMembers, getLatestProjectUpdate, getProjectById, getProjectUpdates } from "@/services/project.services";
import { CreateProjectUpdateInput } from "@/types/project-update";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




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


export function useProjectUpdates(projectId: string) {

  return useQuery({
    
    queryKey: ["project-updates", projectId],
    queryFn: () => getProjectUpdates(projectId),
    enabled:Boolean(projectId)
    
    }
  )
}

export function useLatestProjectUpdates(projectId: string) {


  return useQuery({
    queryKey: ["latest-project-update", projectId],
    queryFn: () => getLatestProjectUpdate(projectId),
    enabled:Boolean(projectId)
  })
}


export function useCreateProjectUpdate(projectId: string) {

  const queryClient = useQueryClient();


  return useMutation(
    {
      mutationFn: (data: CreateProjectUpdateInput) => createProjectUpdate(projectId, data),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["project-updates", projectId]
        });

        queryClient.invalidateQueries({
          queryKey:["latest-project-update",projectId]
        })
        
      }
    }
  )
}