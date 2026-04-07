export interface ChangeHistoryDto {
  id: string;
  userName: string;
  tableName: string;
  recordId: string;
  action: string;
  beforeValue: string;
  afterValue: string;
  changedAt: string;
}

export interface GetChangeHistoryParams {
  tableName?: string;
  startDate?: string;
  endDate?: string;
  query?: string;
}
