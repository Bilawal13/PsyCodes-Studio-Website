import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gameService } from '../services/gameService';
import { Game } from '../types';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: () => gameService.getAll(),
  });
};

export const useGameBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['game', slug],
    queryFn: () => gameService.getBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useGameMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (game: Partial<Game>) => gameService.create(game),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Game> }) =>
      gameService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => gameService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
  });

  return { createMutation, updateMutation, deleteMutation };
};

