import React from 'react';

// 기본 엔티티 인터페이스
export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 이름을 가진 엔티티
export interface NamedEntity extends BaseEntity {
  name: string;
  slug?: string;
}

// 이미지를 가진 엔티티
export interface ImageEntity {
  imageUrl?: string;
  alt?: string;
}

// 가격 정보 (기존 Money 타입과 호환)
export interface PricedEntity {
  price: Money;
  originalPrice?: Money;
  discount?: number; // 할인율 (%)
}

// Money 타입 (기존과 동일하게 유지)
export interface Money {
  currency: 'KRW' | 'USD';
  amount: number;
}

// 기본 컴포넌트 Props
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 선택 가능한 아이템
export interface SelectableItem<T> {
  item?: T;
  onSelect?: (item: T) => void;
}

// 크기 옵션
export type SizeVariant = 'small' | 'medium' | 'large';

// 레이아웃 방향
export type Orientation = 'horizontal' | 'vertical';

// 일반적인 변형(variant) 타입
export type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';