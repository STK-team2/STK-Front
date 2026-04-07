export interface CurrentStockResponse {
  itemId: string;
  itemCode: string;
  itemName: string;
  boxNumber: string;
  location: string;
  currentStock: number;
}

export interface LedgerResponse {
  itemId: string;
  itemCode: string;
  itemName: string;
  boxNumber: string;
  location: string;
  openingStock: number;
  inboundQty: number;
  outboundQty: number;
  closingStock: number;
}

export interface GetLedgerParams {
  from: string;
  to: string;
}
