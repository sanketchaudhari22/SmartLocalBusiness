// Category Types matching backend DTOs

export interface CategoryDto {
  categoryId: number;
  categoryName: string;
  description?: string;
  iconUrl?: string;
  isActive: boolean;
}

export interface CreateCategoryDto {
  categoryName: string;
  description?: string;
  iconUrl?: string;
}
