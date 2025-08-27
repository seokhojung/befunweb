import { render, screen } from '@testing-library/react'
import { Layout } from '@/components/layout/Layout'

describe('Layout Integration', () => {
  it('renders header, main content, and footer', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    
    expect(screen.getByRole('banner')).toBeInTheDocument() // Header
    expect(screen.getByRole('main')).toBeInTheDocument() // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(
      <Layout>
        <h1>Page Title</h1>
        <p>Page content</p>
      </Layout>
    )
    
    const main = screen.getByRole('main')
    expect(main).toContainElement(screen.getByText('Page Title'))
    expect(main).toContainElement(screen.getByText('Page content'))
  })

  it('applies correct styling classes', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1') // Should have flex styling
  })

  it('passes children to main content area', () => {
    const testContent = (
      <div>
        <h1>Test Heading</h1>
        <p>Test paragraph</p>
        <button>Test Button</button>
      </div>
    )
    
    render(<Layout>{testContent}</Layout>)
    
    const main = screen.getByRole('main')
    expect(main).toContainElement(screen.getByText('Test Heading'))
    expect(main).toContainElement(screen.getByText('Test paragraph'))
    expect(main).toContainElement(screen.getByText('Test Button'))
  })

  it('maintains proper document flow', () => {
    render(
      <Layout>
        <div data-testid="content">Main Content</div>
      </Layout>
    )
    
    const elements = [
      screen.getByRole('banner'),
      screen.getByRole('main'),
      screen.getByRole('contentinfo'),
    ]
    
    // Elements should be in correct order in DOM
    elements.forEach((element, index) => {
      if (index > 0) {
        expect(element.compareDocumentPosition(elements[index - 1]))
          .toBe(Node.DOCUMENT_POSITION_PRECEDING)
      }
    })
  })

  it('provides accessible landmark structure', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    
    // Should have all major landmarks
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('handles empty children gracefully', () => {
    render(<Layout>{null}</Layout>)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})