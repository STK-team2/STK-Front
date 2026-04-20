import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../../entities/dashboard/api/dashboardApi';

export const dashboardKeys = {
  overview: (dateKey: string) => ['dashboard', 'overview', dateKey] as const,
};

export const useGetDashboardOverview = () => {
  const today = new Date().toISOString().slice(0, 10);

  return useQuery({
    queryKey: dashboardKeys.overview(today),
    queryFn: () => dashboardApi.getDashboardData(),
  });
};
