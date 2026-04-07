export type ClosingStatus = 'CLOSED' | 'CANCELLED';

export interface ClosingStockResponse {
  closingId: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  boxNumber: string;
  location: string;
  closingYm: string;
  status: ClosingStatus;
  openingStock: number;
  inboundQty: number;
  outboundQty: number;
  closingStock: number;
  userName: string;
  closedAt: string;
}

export interface CloseMonthRequest {
  closingYm: string;
}

export interface CloseMonthResponse {
  closingId: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  closingYm: string;
  status: ClosingStatus;
  openingStock: number;
  inboundQty: number;
  outboundQty: number;
  closingStock: number;
  message: string;
  closedAt: string;
}

export interface GetClosingStockParams {
  closingYm?: string;
  status?: ClosingStatus;
}
