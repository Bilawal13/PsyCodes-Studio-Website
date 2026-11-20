import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceOfferingsService } from '../services/serviceOfferingsService';
import { Service } from '../types';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => serviceOfferingsService.getAll(),
  });
};

export const useServiceMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (service: Partial<Service>) => serviceOfferingsService.create(service),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) =>
      serviceOfferingsService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => serviceOfferingsService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });

  return { createMutation, updateMutation, deleteMutation };
};

