# Development Guide

## 🏗️ Architecture Overview

### Component Architecture
```
components/
├── ui/           # Reusable UI primitives (Button, Badge, Card)
├── cards/        # Specialized card components  
├── sections/     # Page section components
├── layout/       # Layout and navigation components
└── icons/        # Icon components with consistent API
```

### Hook System
```
hooks/
├── useMenuToggle.ts       # Menu state management with accessibility
├── useScrollDirection.ts  # Optimized scroll direction detection
├── useLocalStorage.ts     # Persistent local storage with sync
├── useMediaQuery.ts       # Responsive breakpoint detection
└── useApi.ts              # API state management with caching
```

### Configuration System
```
config/
├── index.ts      # Main config with environment validation
├── api.ts        # API endpoints and request configuration
├── database.ts   # Database connection settings
├── features.ts   # Feature flags and A/B testing
└── validation.ts # Configuration validation utilities
```

## 🧩 Component Development

### Creating New Components

1. **Follow naming conventions**:
   ```tsx
   // components/ui/MyComponent.tsx
   export interface MyComponentProps {
     children?: React.ReactNode;
     className?: string;
     variant?: 'primary' | 'secondary';
   }
   
   export const MyComponent = ({ children, className, variant = 'primary' }: MyComponentProps) => {
     return (
       <div className={cn('base-styles', className)}>
         {children}
       </div>
     )
   }
   ```

2. **Use TypeScript strictly**:
   ```tsx
   // Export props interface for reuse
   export interface ProductCardProps {
     product: Product;
     className?: string;
     onSelect?: (product: Product) => void;
   }
   ```

3. **Implement accessibility**:
   ```tsx
   <button
     aria-label={`Select ${product.name}`}
     aria-describedby={`${product.id}-description`}
     tabIndex={0}
     role="button"
   >
   ```

4. **Add performance optimizations**:
   ```tsx
   export const ProductCard = React.memo(function ProductCard({ 
     product, 
     className 
   }: ProductCardProps) {
     const productInfo = useMemo(() => ({
       hasDiscount: product.originalPrice && product.discount,
       formattedPrice: formatPrice(product.price),
     }), [product.originalPrice, product.discount, product.price]);
   
     return (/* JSX */);
   });
   ```

### Testing Components

```tsx
// MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(<MyComponent>Test content</MyComponent>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    
    render(<MyComponent onClick={handleClick}>Click me</MyComponent>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 🎣 Custom Hooks Development

### Hook Development Guidelines

1. **Single Responsibility**: Each hook should have one clear purpose
2. **Return Objects**: Use objects instead of arrays for better API
3. **Cleanup**: Always cleanup event listeners and subscriptions
4. **TypeScript**: Provide comprehensive type definitions

### Example Hook Implementation

```tsx
// hooks/useLocalStorage.ts
export interface UseLocalStorageOptions<T> {
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T>
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? options.deserialize?.(item) ?? JSON.parse(item) : options.defaultValue;
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error);
      return options.defaultValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const serializedValue = options.serialize?.(valueToStore) ?? JSON.stringify(valueToStore);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, options]);

  return { value: storedValue, setValue };
}
```

### Hook Testing

```tsx
// hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default value when no stored value exists', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', { defaultValue: 'default' })
    )
    
    expect(result.current.value).toBe('default')
  })

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', { defaultValue: 'default' })
    )
    
    act(() => {
      result.current.setValue('new value')
    })
    
    expect(localStorage.getItem('test-key')).toBe('"new value"')
    expect(result.current.value).toBe('new value')
  })
})
```

## ⚙️ Configuration Management

### Environment Variables

All environment variables should be defined in the Zod schema:

```typescript
// config/index.ts
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().default('/api'),
  NEXT_PUBLIC_CONFIGURATOR_URL: z.string().url().default('https://befun241204.netlify.app/'),
  // ... other variables
});
```

### Feature Flags

```typescript
// config/features.ts
export const featureFlags = {
  ui: {
    newProductCard: config.isDevelopment,
    advancedFilters: true,
  },
  experimental: {
    aiRecommendations: config.isDevelopment,
    voiceSearch: false,
  },
}

// Usage in components
if (featureFlags.ui.newProductCard) {
  return <NewProductCard />
}
```

### A/B Testing

```typescript
// Get variant for user
const heroVariant = getAbTestVariant('heroSection')

switch (heroVariant) {
  case 'variant-a':
    return <HeroVariantA />
  case 'variant-b':
    return <HeroVariantB />
  default:
    return <HeroOriginal />
}
```

## 🧪 Testing Strategy

### Unit Tests
- Test individual components in isolation
- Mock external dependencies
- Focus on user interactions and state changes
- Aim for 70%+ code coverage

### Integration Tests
- Test component interactions
- Test hook integrations
- Test layout and navigation
- Focus on user workflows

### E2E Tests (Playwright)
```typescript
// tests/e2e/configurator.spec.ts
import { test, expect } from '@playwright/test'

test('configurator loads and displays products', async ({ page }) => {
  await page.goto('/configurator')
  await expect(page.getByRole('heading', { name: /구성기/ })).toBeVisible()
  await expect(page.locator('iframe')).toBeVisible()
})
```

### Accessibility Tests
```typescript
// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('homepage accessibility', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page)
})
```

## 🎯 Performance Guidelines

### Component Performance

1. **Use React.memo for expensive components**:
   ```tsx
   export const ProductCard = React.memo(function ProductCard(props) {
     // Component logic
   }, (prevProps, nextProps) => {
     // Custom comparison for optimal re-rendering
     return prevProps.product.id === nextProps.product.id
   })
   ```

2. **Memoize expensive calculations**:
   ```tsx
   const expensiveValue = useMemo(() => {
     return calculateExpensiveValue(props.data)
   }, [props.data])
   ```

3. **Optimize event handlers**:
   ```tsx
   const handleClick = useCallback((id: string) => {
     onProductSelect(id)
   }, [onProductSelect])
   ```

### Image Optimization

```tsx
import Image from 'next/image'
import { IMAGE_SIZES, IMAGE_QUALITY } from '@/constants'

<Image
  src={product.image}
  alt={product.name}
  sizes={IMAGE_SIZES.productCard}
  quality={IMAGE_QUALITY.medium}
  loading="lazy"
  placeholder="blur"
  blurDataURL={BLUR_DATA_URLS.square}
/>
```

### Bundle Optimization

```typescript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
})
```

## 🔒 Security Best Practices

1. **Never expose secrets in client code**
2. **Validate all external inputs**
3. **Use Content Security Policy in production**
4. **Sanitize user-generated content**
5. **Use HTTPS in production**

### Input Validation

```typescript
// Use Zod for validation
const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  price: z.number().positive(),
})

// Validate before processing
const validatedProduct = productSchema.parse(userInput)
```

## 📊 Monitoring and Analytics

### Performance Monitoring

```typescript
// Track Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

### User Analytics

```typescript
import { analytics } from '@/lib/analytics'

// Track user interactions
analytics.selectItem(product.id, product.name, product.category)
analytics.viewItem(product.id, product.name, product.price, 'KRW')
```

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] All tests pass
- [ ] TypeScript compilation successful
- [ ] Lint checks pass
- [ ] Bundle size within limits
- [ ] Lighthouse score > 90
- [ ] Accessibility tests pass
- [ ] Environment variables configured

### Post-deployment
- [ ] Monitor error rates
- [ ] Check Core Web Vitals
- [ ] Verify analytics tracking
- [ ] Test critical user paths
- [ ] Monitor performance metrics

## 🤝 Code Review Guidelines

### What to Look For
1. **Code Quality**: Clean, readable, well-structured code
2. **Performance**: No unnecessary re-renders or expensive operations
3. **Accessibility**: Proper ARIA labels and semantic HTML
4. **Testing**: Adequate test coverage for new features
5. **Type Safety**: Proper TypeScript usage
6. **Documentation**: Clear comments for complex logic

### Review Checklist
- [ ] Code follows project conventions
- [ ] Tests are comprehensive and meaningful
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Security implications are considered
- [ ] Documentation is updated if necessary

---

*This guide is a living document. Please update it as the project evolves.*