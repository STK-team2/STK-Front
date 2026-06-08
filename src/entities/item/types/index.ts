export interface ItemResponse {
  id: string;
  itemCode: string;
  itemName: string;
  boxNumber: string;
  location: string;
  categoryName?: string;
  imageUrl?: string;
  lowStockThreshold?: number;
  createdAt: string;
}

export interface RegisterItemRequest {
  itemCode: string;
  itemName: string;
  boxNumber?: string;
  location: string;
  categoryId?: string;
  lowStockThreshold?: number;
}

export type UpdateItemRequest = RegisterItemRequest;
