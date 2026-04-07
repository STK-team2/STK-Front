export interface ItemResponse {
  id: string;
  itemCode: string;
  itemName: string;
  boxNumber: string;
  location: string;
  createdAt: string;
}

export interface RegisterItemRequest {
  itemCode: string;
  itemName: string;
  boxNumber?: string;
  location: string;
}
