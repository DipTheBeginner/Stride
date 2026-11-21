import { getProjectById } from "@/services/project.services";
import { useQuery } from "@tanstack/react-query";




export function useProject(projectId: string) {

  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled:Boolean(projectId)
  })
}