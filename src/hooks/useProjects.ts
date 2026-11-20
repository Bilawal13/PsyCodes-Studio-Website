import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { Project } from '../types';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getAll(),
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectService.getBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useProjectMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (project: Partial<Project>) => projectService.create(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      projectService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  return { createMutation, updateMutation, deleteMutation };
};

