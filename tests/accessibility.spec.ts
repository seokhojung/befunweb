import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('홈페이지 접근성 검사', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/Befun/);
    
    // 메인 랜드마크 확인
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible();
    
    // 헤더 랜드마크 확인
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
    
    // 네비게이션 역할 확인
    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();
    
    // 히어로 섹션 확인
    const heroSection = page.locator('section[role="banner"]');
    await expect(heroSection).toBeVisible();
    
    // CTA 버튼 접근성 확인
    const ctaButton = page.locator('a[href="/configurator"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('aria-describedby');
    
    // 키보드 네비게이션 테스트
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // 스크린 리더 전용 콘텐츠 확인
    const srOnly = page.locator('.sr-only');
    await expect(srOnly).toBeVisible();
  });

  test('상품 목록 페이지 접근성 검사', async ({ page }) => {
    await page.goto('/products');
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/상품 목록/);
    
    // 검색 섹션 역할 확인
    const searchSection = page.locator('section[role="search"]');
    await expect(searchSection).toBeVisible();
    
    // 검색 입력 필드 라벨 확인
    const searchInput = page.locator('#search-input');
    const searchLabel = page.locator('label[for="search-input"]');
    await expect(searchInput).toBeVisible();
    await expect(searchLabel).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-describedby');
    
    // 카테고리 필터 라벨 확인
    const categoryFilter = page.locator('#category-filter');
    const categoryLabel = page.locator('label[for="category-filter"]');
    await expect(categoryFilter).toBeVisible();
    await expect(categoryLabel).toBeVisible();
    
    // 정렬 옵션 라벨 확인
    const sortSelect = page.locator('#sort-select');
    const sortLabel = page.locator('label[for="sort-select"]');
    await expect(sortSelect).toBeVisible();
    await expect(sortLabel).toBeVisible();
    
    // 상품 그리드 역할 확인
    const productGrid = page.locator('section[role="grid"]');
    await expect(productGrid).toBeVisible();
    
    // 상품 카드 접근성 확인
    const productCards = page.locator('article[role="article"]');
    await expect(productCards.first()).toBeVisible();
    await expect(productCards.first()).toHaveAttribute('aria-labelledby');
  });

  test('상품 상세 페이지 접근성 검사', async ({ page }) => {
    await page.goto('/products/1');
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/Modern Chair/);
    
    // 메인 랜드마크 확인
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible();
    
    // 상품 이미지 섹션 확인
    const imageSection = page.locator('section[aria-label="상품 이미지"]');
    await expect(imageSection).toBeVisible();
    
    // 상품 정보 섹션 확인
    const infoSection = page.locator('section[aria-label="상품 정보"]');
    await expect(infoSection).toBeVisible();
    
    // 가격 정보 접근성 확인
    const priceElement = page.locator('[aria-label*="가격:"]');
    await expect(priceElement).toBeVisible();
    
    // 카테고리 접근성 확인
    const categoryElement = page.locator('[aria-label*="카테고리:"]');
    await expect(categoryElement).toBeVisible();
    
    // 버튼 접근성 확인
    const configuratorButton = page.locator('button:has-text("구성기로 이동")');
    await expect(configuratorButton).toBeVisible();
    await expect(configuratorButton).toHaveAttribute('aria-describedby');
    
    // 변형 옵션 리스트 역할 확인
    const variantsList = page.locator('[role="list"][aria-label="상품 변형 옵션"]');
    if (await variantsList.isVisible()) {
      await expect(variantsList).toBeVisible();
      const listItems = page.locator('[role="listitem"]');
      await expect(listItems.first()).toBeVisible();
    }
  });

  test('구성기 페이지 접근성 검사', async ({ page }) => {
    await page.goto('/configurator');
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/구성기/);
    
    // 메인 랜드마크 확인
    const main = page.locator('main[role="main"]');
    await expect(main).toBeVisible();
    
    // 구성기 제목 섹션 확인
    const titleSection = page.locator('section[aria-labelledby="configurator-title"]');
    await expect(titleSection).toBeVisible();
    
    // 구성기 iframe 섹션 확인
    const iframeSection = page.locator('section[aria-label="상품 구성기"]');
    await expect(iframeSection).toBeVisible();
    
    // iframe 접근성 확인
    const iframe = page.locator('iframe[title*="Befun 구성기"]');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('aria-describedby');
    
    // 사용 안내 섹션 확인
    const usageSection = page.locator('section[aria-labelledby="usage-guide-title"]');
    await expect(usageSection).toBeVisible();
    
    // 스크린 리더 전용 설명 확인
    const srOnly = page.locator('.sr-only');
    await expect(srOnly).toBeVisible();
  });

  test('키보드 네비게이션 테스트', async ({ page }) => {
    await page.goto('/');
    
    // Tab 키로 포커스 이동 테스트
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Enter 키로 링크 활성화 테스트
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/');
    
    // 상품 목록 페이지로 이동
    await page.goto('/products');
    
    // 검색 입력 필드로 포커스 이동
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveAttribute('id', 'search-input');
    
    // 검색어 입력 테스트
    await page.keyboard.type('chair');
    await expect(focusedElement).toHaveValue('chair');
  });

  test('색상 대비 및 시각적 접근성', async ({ page }) => {
    await page.goto('/');
    
    // 고대비 모드 시뮬레이션
    await page.addStyleTag({
      content: `
        * { 
          color: #000000 !important; 
          background-color: #ffffff !important; 
          border-color: #000000 !important; 
        }
      `
    });
    
    // 텍스트가 여전히 읽기 가능한지 확인
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // 원래 스타일로 복원
    await page.reload();
    
    // 다크 모드 시뮬레이션
    await page.addStyleTag({
      content: `
        * { 
          color: #ffffff !important; 
          background-color: #1f2937 !important; 
        }
      `
    });
    
    // 텍스트가 여전히 읽기 가능한지 확인
    await expect(heroTitle).toBeVisible();
  });
});
