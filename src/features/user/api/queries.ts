import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../../entities/user/api/userApi';
import type { UserRole } from '../../../entities/user/types';

export const userKeys = {
  all: ['users'] as const,
};

export const useGetUsers = () =>
  useQuery({
    queryKey: userKeys.all,
    queryFn: () => userApi.getUsers(),
    select: (res) => res.data ?? [],
  });

export const useChangeRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      userApi.changeRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
