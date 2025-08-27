import { renderHook, act } from '@testing-library/react'
import { useMenuToggle } from './useMenuToggle'

describe('useMenuToggle Hook', () => {
  beforeEach(() => {
    // Clear all event listeners between tests
    document.removeEventListener = jest.fn()
    document.addEventListener = jest.fn()
  })

  it('initializes with closed state', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    expect(result.current.isOpen).toBe(false)
  })

  it('opens and closes menu', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('toggles menu state', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('provides menu and button props', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    const menuProps = result.current.getMenuProps()
    const buttonProps = result.current.getButtonProps()
    
    expect(menuProps).toHaveProperty('role', 'menu')
    expect(menuProps).toHaveProperty('ref')
    expect(menuProps).toHaveProperty('aria-hidden')
    
    expect(buttonProps).toHaveProperty('ref')
    expect(buttonProps).toHaveProperty('aria-expanded')
    expect(buttonProps).toHaveProperty('aria-haspopup')
    expect(buttonProps).toHaveProperty('onClick')
  })

  it('sets aria-expanded correctly', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    let buttonProps = result.current.getButtonProps()
    expect(buttonProps['aria-expanded']).toBe(false)
    
    act(() => {
      result.current.open()
    })
    
    buttonProps = result.current.getButtonProps()
    expect(buttonProps['aria-expanded']).toBe(true)
  })

  it('sets aria-hidden correctly for menu', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    let menuProps = result.current.getMenuProps()
    expect(menuProps['aria-hidden']).toBe(true)
    
    act(() => {
      result.current.open()
    })
    
    menuProps = result.current.getMenuProps()
    expect(menuProps['aria-hidden']).toBe(false)
  })

  it('handles button click', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    const buttonProps = result.current.getButtonProps()
    
    act(() => {
      buttonProps.onClick()
    })
    
    expect(result.current.isOpen).toBe(true)
  })

  it('accepts custom options', () => {
    const onOpenChange = jest.fn()
    const { result } = renderHook(() => 
      useMenuToggle({ 
        defaultOpen: true,
        onOpenChange,
        closeOnEscape: true,
        closeOnOutsideClick: true
      })
    )
    
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.close()
    })
    
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('provides refs for menu and button', () => {
    const { result } = renderHook(() => useMenuToggle())
    
    expect(result.current.menuRef).toBeDefined()
    expect(result.current.buttonRef).toBeDefined()
    expect(result.current.menuRef.current).toBeNull() // Initially null
    expect(result.current.buttonRef.current).toBeNull() // Initially null
  })
})