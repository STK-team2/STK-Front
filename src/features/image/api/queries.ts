import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { imageApi } from '../../../entities/image/api/imageApi';
import { itemKeys } from '../../item/api/queries';

export const imageKeys = {
  url: (itemId: string) => ['image', itemId] as const,
};

export const useGetImageUrl = (itemId: string, enabled = true) =>
  useQuery({
    queryKey: imageKeys.url(itemId),
    queryFn: () => imageApi.getImageUrl(itemId),
    select: (res) => Object.values(res.data ?? {})[0] ?? null,
    enabled: enabled && !!itemId,
    staleTime: 50 * 60 * 1000,
  });

export const useUploadImage = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => imageApi.uploadImage(itemId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imageKeys.url(itemId) });
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};

export const useDeleteImage = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => imageApi.deleteImage(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imageKeys.url(itemId) });
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
};
