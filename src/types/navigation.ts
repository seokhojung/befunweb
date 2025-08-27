import { BaseEntity, Orientation, Variant } from './common';

// 네비게이션 아이템
export interface NavItem extends BaseEntity {
  name: string;
  href: string;
  isExternal?: boolean;
  icon?: string;
  badge?: string;
  isActive?: boolean;
}

// 메뉴 구조 (계층형)
export interface MenuItem extends NavItem {
  children?: MenuItem[];
  level: number;
}

// 네비게이션 Props
export interface NavigationProps {
  items: NavItem[];
  orientation?: Orientation;
  variant?: Variant | 'pills' | 'underline';
  className?: string;
}

// 브레드크럼 아이템
export interface BreadcrumbItem {
  name: string;
  href?: string;
  isActive?: boolean;
}

// 브레드크럼 Props
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}