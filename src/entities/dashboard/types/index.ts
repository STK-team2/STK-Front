export interface DashboardSummary {
  todayInbound: number;
  todayOutbound: number;
  totalItems: number;
}

export interface WeeklyMovement {
  date: string;
  inboundCount: number;
  outboundCount: number;
}

export interface RecentMovement {
  movementId: string;
  itemCode: string;
  itemName: string;
  type: 'INBOUND' | 'OUTBOUND';
  quantity: number;
  movementDate: string;
  site: string;
}

export interface MonthlyTrend {
  month: string;
  inboundTotal: number;
  outboundTotal: number;
}

export interface ClosingStatus {
  closingYm: string;
  closedCount: number;
  unclosedCount: number;
  totalClosedAll: number;
  closed: boolean;
}
