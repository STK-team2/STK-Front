export type MovementType =
  | 'INBOUND'
  | 'OUTBOUND'
  | 'RETURN_INBOUND'
  | 'RETURN_OUTBOUND'
  | 'EXCHANGE_OUT'
  | 'EXCHANGE_IN';

export interface MovementResponse {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  location: string;
  site: string;
  type: MovementType;
  quantity: number;
  movementDate: string;
  reference: string;
  note: string;
  userName: string;
  createdAt: string;
}

export interface RegisterInboundRequest {
  site: string;
  itemId: string;
  quantity: number;
  movementDate: string;
  location?: string;
  reference?: string;
  note?: string;
}

export interface RegisterOutboundRequest {
  site: string;
  itemId: string;
  quantity: number;
  movementDate: string;
  reference?: string;
  note?: string;
  allowNegativeStock?: boolean;
}

export interface RegisterItemAndInboundRequest {
  itemCode: string;
  itemName: string;
  boxNumber?: string;
  location: string;
  site: string;
  quantity: number;
  movementDate: string;
  reference?: string;
  note?: string;
}

export interface NewItemInboundResponse {
  itemId: string;
  itemCode: string;
  itemName: string;
  movement: MovementResponse;
}

export interface UpdateMovementRequest {
  site: string;
  itemCode?: string;
  location?: string;
  quantity: number;
  movementDate: string;
  reference?: string;
  note?: string;
}

export interface GetMovementsParams {
  type?: MovementType;
  from?: string;
  to?: string;
  query?: string;
}
