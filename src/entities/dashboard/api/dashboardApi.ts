import { instance } from '../../../shared/api/instance';
import type { ApiResponse } from '../../../shared/types/api';
import type {
  DashboardSummary,
  WeeklyMovement,
  RecentMovement,
  MonthlyTrend,
  ClosingStatus,
} from '../types';

export const dashboardApi = {
  getSummary: () =>
    instance
      .get<ApiResponse<DashboardSummary>>('/dashboard/summary')
      .then((r) => r.data),

  getWeeklyMovements: () =>
    instance
      .get<ApiResponse<WeeklyMovement[]>>('/dashboard/weekly-movements')
      .then((r) => r.data),

  getRecentMovements: (limit = 5) =>
    instance
      .get<ApiResponse<RecentMovement[]>>('/dashboard/recent-movements', { params: { limit } })
      .then((r) => r.data),

  getMonthlyTrend: () =>
    instance
      .get<ApiResponse<MonthlyTrend[]>>('/dashboard/monthly-trend')
      .then((r) => r.data),

  getClosingStatus: () =>
    instance
      .get<ApiResponse<ClosingStatus>>('/dashboard/closing-status')
      .then((r) => r.data),
};
