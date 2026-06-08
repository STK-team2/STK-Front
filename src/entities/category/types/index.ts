export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children?: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  parentId?: string;
}
