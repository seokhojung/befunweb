/**
 * 타입 가드 유틸리티 함수들
 * 런타임에서 안전한 타입 체크를 위한 헬퍼 함수들
 */

// Null 체크
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

// Undefined 체크
export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

// Null 또는 undefined 체크
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null;
}

// 문자열 타입 체크
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// 숫자 타입 체크
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

// 불린 타입 체크
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

// 객체 타입 체크
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// 배열 타입 체크
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

// 함수 타입 체크
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

// 특정 속성을 가진 객체인지 체크
export function hasProperty<T extends string>(
  obj: unknown,
  prop: T
): obj is Record<T, unknown> {
  return isObject(obj) && prop in obj;
}

// 여러 속성을 가진 객체인지 체크
export function hasProperties<T extends string>(
  obj: unknown,
  props: readonly T[]
): obj is Record<T, unknown> {
  return isObject(obj) && props.every(prop => prop in obj);
}

// 빈 객체 체크
export function isEmptyObject(obj: unknown): obj is Record<string, never> {
  return isObject(obj) && Object.keys(obj).length === 0;
}

// 빈 배열 체크
export function isEmptyArray(value: unknown): value is never[] {
  return isArray(value) && value.length === 0;
}

// 빈 문자열 체크
export function isEmptyString(value: unknown): value is '' {
  return isString(value) && value.length === 0;
}

// 빈 값 체크 (null, undefined, 빈 문자열, 빈 배열, 빈 객체)
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (isEmptyString(value)) return true;
  if (isEmptyArray(value)) return true;
  if (isEmptyObject(value)) return true;
  return false;
}

// Promise 타입 체크
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    isObject(value) &&
    isFunction((value as Record<string, unknown>).then) &&
    isFunction((value as Record<string, unknown>).catch)
  );
}

// Error 타입 체크
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

// Date 타입 체크
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

// 유효한 이메일 형식 체크
export function isValidEmail(value: unknown): value is string {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// 유효한 URL 형식 체크
export function isValidUrl(value: unknown): value is string {
  if (!isString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// 숫자 문자열 체크
export function isNumericString(value: unknown): value is string {
  return isString(value) && !isNaN(Number(value)) && !isEmptyString(value);
}

// 정수 체크
export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

// 양수 체크
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

// 음이 아닌 수 체크
export function isNonNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0;
}