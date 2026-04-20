import { closingApi } from '../../closing/api/closingApi';
import { movementApi } from '../../movement/api/movementApi';
import { stockApi } from '../../stock/api/stockApi';
import type { MovementResponse } from '../../movement/types';
import type { DashboardData, MonthlyTrend, RecentMovement, WeeklyMovement } from '../types';

const isRecentMovement = (
  movement: MovementResponse,
): movement is MovementResponse & { type: RecentMovement['type'] } =>
  movement.type === 'INBOUND' || movement.type === 'OUTBOUND';

const pad = (value: number) => String(value).padStart(2, '0');
const toDateString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const toMonthKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

const addDays = (date: Date, amount: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

const addMonths = (date: Date, amount: number) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
};

const getLastDates = (baseDate: Date, count: number) =>
  Array.from({ length: count }, (_, index) => {
    const offset = index - (count - 1);
    return addDays(baseDate, offset);
  });

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    const todayDate = new Date();
    const todayStr = toDateString(todayDate);
    const currentMonth = toMonthKey(todayDate);
    const weeklyDates = getLastDates(todayDate, 7);
    const monthlyDates = Array.from({ length: 6 }, (_, index) => addMonths(todayDate, index - 5));
    const monthlyStart = new Date(monthlyDates[0].getFullYear(), monthlyDates[0].getMonth(), 1);

    const [currentStockResponse, movementResponse, closingResponse] = await Promise.all([
      stockApi.getCurrentStock(),
      movementApi.getMovements({
        from: toDateString(monthlyStart),
        to: todayStr,
      }),
      closingApi.getClosingStock(),
    ]);

    const currentStock = currentStockResponse.data;
    const movementRows = movementResponse.data;
    const closingRows = closingResponse.data;

    const summary = {
      totalItems: currentStock.length,
      todayInbound: movementRows.filter((movement) =>
        movement.movementDate === todayStr && movement.type === 'INBOUND',
      ).length,
      todayOutbound: movementRows.filter((movement) =>
        movement.movementDate === todayStr && movement.type === 'OUTBOUND',
      ).length,
    };

    const weeklyMovements: WeeklyMovement[] = weeklyDates.map((date) => {
      const dateString = toDateString(date);

      return {
        date: dateString,
        inboundCount: movementRows.filter((movement) =>
          movement.movementDate === dateString && movement.type === 'INBOUND',
        ).length,
        outboundCount: movementRows.filter((movement) =>
          movement.movementDate === dateString && movement.type === 'OUTBOUND',
        ).length,
      };
    });

    const recentMovements: RecentMovement[] = movementRows
      .filter(isRecentMovement)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map((movement) => ({
        movementId: movement.id,
        itemCode: movement.itemCode,
        itemName: movement.itemName,
        type: movement.type,
        quantity: movement.quantity,
        movementDate: movement.movementDate,
        site: movement.site,
      }));

    const monthlyTrend: MonthlyTrend[] = monthlyDates.map((date) => {
      const monthKey = toMonthKey(date);

      return {
        month: monthKey,
        inboundTotal: movementRows
          .filter((movement) => movement.movementDate.startsWith(monthKey) && movement.type === 'INBOUND')
          .reduce((sum, movement) => sum + movement.quantity, 0),
        outboundTotal: movementRows
          .filter((movement) => movement.movementDate.startsWith(monthKey) && movement.type === 'OUTBOUND')
          .reduce((sum, movement) => sum + movement.quantity, 0),
      };
    });

    const currentMonthClosingRows = closingRows.filter((row) => row.closingYm === currentMonth);
    const closedCount = currentMonthClosingRows.filter((row) => row.status === 'CLOSED').length;
    const unclosedCount = Math.max(currentStock.length - closedCount, 0);

    return {
      summary,
      weeklyMovements,
      recentMovements,
      monthlyTrend,
      closingStatus: {
        closingYm: currentMonth,
        closedCount,
        unclosedCount,
        totalClosedAll: closingRows.filter((row) => row.status === 'CLOSED').length,
        closed: currentStock.length > 0 && unclosedCount === 0,
      },
    };
  },
};
