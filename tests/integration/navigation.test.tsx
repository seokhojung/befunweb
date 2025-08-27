import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/components/layout/Header'

// Mock useMenuToggle hook
jest.mock('@/hooks/useMenuToggle', () => ({
  useMenuToggle: jest.fn(() => ({
    isOpen: false,
    getMenuProps: () => ({ role: 'menu', 'aria-hidden': true, ref: { current: null } }),
    getButtonProps: () => ({ 
      'aria-expanded': false, 
      'aria-haspopup': true, 
      onClick: jest.fn(),
      ref: { current: null }
    }),
    close: jest.fn(),
  })),
}))

describe('Navigation Integration', () => {
  it('renders header with navigation links', () => {
    render(<Header />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Befun')).toBeInTheDocument()
  })

  it('displays mobile menu button', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /메뉴 열기/i })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', '주 내비게이션')
    
    const logo = screen.getByRole('link', { name: /befun 홈페이지로 이동/i })
    expect(logo).toBeInTheDocument()
  })

  it('contains expected navigation elements', () => {
    render(<Header />)
    
    // Logo should be present
    expect(screen.getByText('Befun')).toBeInTheDocument()
    
    // Menu button should be present
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    const nav = screen.getByRole('navigation')
    
    expect(header).toContainElement(nav)
    expect(nav).toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    
    await user.tab()
    expect(menuButton).toHaveFocus()
  })

  it('maintains focus management', () => {
    render(<Header />)
    
    const focusableElements = screen.getAllByRole('button')
    const links = screen.getAllByRole('link')
    
    // Should have focusable elements
    expect([...focusableElements, ...links].length).toBeGreaterThan(0)
  })
})