import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiryService } from '../services/inquiryService';
import { Inquiry } from '../types';

export const useInquiries = () => {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: () => inquiryService.getAll(),
  });
};

export const useInquiryMutations = () => {
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>) =>
      inquiryService.submit(inquiry),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: NonNullable<Inquiry['status']> }) =>
      inquiryService.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  return { submitMutation, updateStatusMutation };
};
