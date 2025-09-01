// 환율 정보 (2024년 기준 대략적인 환율)
const EXCHANGE_RATES = {
  USD: 1300, // 1 USD = 1300 KRW
  EUR: 1400, // 1 EUR = 1400 KRW
  KRW: 1     // 1 KRW = 1 KRW
} as const;

export type Currency = keyof typeof EXCHANGE_RATES;

export interface Price {
  amount: number;
  currency: Currency;
}

/**
 * 가격을 한국 원화로 변환하고 100원 단위로 반올림
 */
export function convertToKRW(price: Price): number {
  const exchangeRate = EXCHANGE_RATES[price.currency];
  const krwAmount = price.amount * exchangeRate;
  
  // 100원 단위로 반올림
  return Math.round(krwAmount / 100) * 100;
}

/**
 * 한국 원화 가격을 포맷팅 (천 단위 콤마 포함)
 */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount);
}

/**
 * 가격을 한국 원화로 변환하고 포맷팅
 */
export function convertAndFormatPrice(price: Price): string {
  const krwAmount = convertToKRW(price);
  return `₩${formatKRW(krwAmount)}`;
}

/**
 * 할인율 계산
 */
export function calculateDiscountRate(originalPrice: Price, currentPrice: Price): number {
  const originalKRW = convertToKRW(originalPrice);
  const currentKRW = convertToKRW(currentPrice);
  
  if (originalKRW <= currentKRW) return 0;
  
  return Math.round(((originalKRW - currentKRW) / originalKRW) * 100);
}