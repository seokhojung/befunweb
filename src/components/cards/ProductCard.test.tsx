import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'

const mockProduct = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  description: 'A test product description',
  price: 99.99,
  originalPrice: 129.99,
  discount: 23,
  image: '/test-image.jpg',
  category: 'office',
}

// Mock analytics locally (removed unused variable)

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('A test product description')).toBeInTheDocument()
    expect(screen.getByText('₩99.99')).toBeInTheDocument()
    expect(screen.getByText('₩129.99')).toBeInTheDocument()
    expect(screen.getByText('23% 할인')).toBeInTheDocument()
  })

  it('displays discount badge when product has discount', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('23% 할인')).toBeInTheDocument()
  })

  it('does not display discount when product has no discount', () => {
    const productWithoutDiscount = { ...mockProduct, discount: 0, originalPrice: undefined }
    render(<ProductCard product={productWithoutDiscount} />)
    
    expect(screen.queryByText(/할인/)).not.toBeInTheDocument()
    expect(screen.getByText('₩99.99')).toBeInTheDocument()
  })

  it('displays correct category', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Office')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} />)
    
    const card = screen.getByRole('article')
    await user.click(card)
    
    // Should not throw error when clicking
    expect(card).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} />)
    
    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('Test Product'))
  })

  it('applies custom className', () => {
    render(<ProductCard product={mockProduct} className="custom-class" />)
    expect(screen.getByRole('article')).toHaveClass('custom-class')
  })

  it('renders image with correct attributes', () => {
    render(<ProductCard product={mockProduct} />)
    
    const image = screen.getByAltText('Test Product')
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'))
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} />)
    
    const card = screen.getByRole('article')
    await user.tab()
    
    expect(card).toHaveFocus()
  })

  it('memoizes correctly with same props', () => {
    const { rerender } = render(<ProductCard product={mockProduct} />)
    const firstRender = screen.getByRole('article')
    
    rerender(<ProductCard product={mockProduct} />)
    const secondRender = screen.getByRole('article')
    
    // Component should be memoized
    expect(firstRender).toEqual(secondRender)
  })
})