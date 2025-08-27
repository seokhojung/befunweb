import { NamedEntity, ImageEntity } from './common';

// 카테고리 타입 (기존 Category와 호환)
export interface Category extends NamedEntity, ImageEntity {
  description?: string;
  productCount?: number;
  isActive?: boolean;
  parentCategoryId?: string;
  image?: string; // 기존 호환성을 위해 유지
}

// 카테고리 계층 구조
export interface CategoryHierarchy extends Category {
  children?: CategoryHierarchy[];
  level: number;
}

// 카테고리 트리 구조용
export interface CategoryTree {
  categories: CategoryHierarchy[];
  maxDepth: number;
}