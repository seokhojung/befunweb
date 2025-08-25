// GA4 이벤트 추적 유틸리티
type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'get';
type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag: (command: GtagCommand, target: string, params?: GtagParams) => void;
  }
}

// GA4 이벤트 타입 정의
export type GA4Event = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
};

// GA4 이벤트 전송 함수
export const sendGA4Event = (event: GA4Event) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }
  
  // 개발 환경에서 콘솔에 로그 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('GA4 Event:', event);
  }
};

// 표준 GA4 이벤트 함수들
export const analytics = {
  // 페이지 뷰
  pageView: (page_path: string, page_title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path,
        page_title,
      });
    }
  },

  // 히어로 섹션 뷰
  heroViewed: () => {
    sendGA4Event({
      action: 'hero_viewed',
      category: 'engagement',
      label: 'home_hero',
    });
  },

  // 상품 목록 뷰
  viewItemList: (item_list_id: string, item_list_name: string) => {
    sendGA4Event({
      action: 'view_item_list',
      category: 'ecommerce',
      label: item_list_name,
      custom_parameters: {
        item_list_id,
        item_list_name,
      },
    });
  },

  // 상품 선택
  selectItem: (item_id: string, item_name: string, item_category: string) => {
    sendGA4Event({
      action: 'select_item',
      category: 'ecommerce',
      label: item_name,
      custom_parameters: {
        item_id,
        item_name,
        item_category,
      },
    });
  },

  // 상품 상세 뷰
  viewItem: (item_id: string, item_name: string, price: number, currency: string) => {
    sendGA4Event({
      action: 'view_item',
      category: 'ecommerce',
      label: item_name,
      value: price,
      custom_parameters: {
        item_id,
        item_name,
        price,
        currency,
      },
    });
  },

  // 장바구니 추가 (모의)
  addToCart: (item_id: string, item_name: string, price: number, currency: string) => {
    sendGA4Event({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: item_name,
      value: price,
      custom_parameters: {
        item_id,
        item_name,
        price,
        currency,
      },
    });
  },

  // 구성 변경
  configChange: (item_id: string, variant: string, price: number, currency: string) => {
    sendGA4Event({
      action: 'config_change',
      category: 'ecommerce',
      label: variant,
      value: price,
      custom_parameters: {
        item_id,
        variant,
        price,
        currency,
      },
    });
  },
};
