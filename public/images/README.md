# 이미지 디렉토리 구조

이 디렉토리는 프로젝트의 모든 이미지 에셋을 체계적으로 관리하기 위한 구조입니다.

## 📁 디렉토리 구조

```
public/images/
├── banners/       # 홈페이지 배너, 프로모션 배너 등
├── products/      # 제품 이미지
├── categories/    # 카테고리 아이콘 및 이미지
├── icons/         # UI 아이콘 및 SVG 파일
└── logos/         # 브랜드 로고 및 파트너 로고
```

## 📝 네이밍 규칙

### banners/
- 형식: `[위치]-[설명].webp`
- 예시: `home-hero.webp`, `promo-collection.webp`

### products/
- 형식: `[제품ID]-[뷰타입].webp`
- 예시: `chair-001-main.webp`, `sofa-002-thumbnail.webp`

### categories/
- 형식: `[카테고리명]-[타입].webp`
- 예시: `storage-icon.webp`, `furniture-banner.webp`

### icons/
- 형식: `[아이콘명]-[크기].svg`
- 예시: `arrow-right-24.svg`, `menu-32.svg`

### logos/
- 형식: `[브랜드명]-[변형].webp`
- 예시: `befun-main.webp`, `partner-ikea.webp`

## 🎨 이미지 포맷 가이드

- **WebP**: 대부분의 이미지 (압축률이 좋고 품질 유지)
- **SVG**: 아이콘 및 로고 (확장 가능한 벡터 그래픽)
- **PNG**: 투명 배경이 필요한 경우
- **JPG**: 사진 이미지 (WebP를 지원하지 않는 브라우저용 폴백)

## 📏 권장 사이즈

- **배너**: 1920x600 (데스크톱), 768x400 (모바일)
- **제품 메인**: 800x800
- **제품 썸네일**: 400x400
- **카테고리 아이콘**: 64x64
- **로고**: 200x60 (헤더용)