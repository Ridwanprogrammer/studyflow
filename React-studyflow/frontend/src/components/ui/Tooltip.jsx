import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 200,
  className = '',
  arrow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [positionStyles, setPositionStyles] = useState({})
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const timeoutRef = useRef(null)

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const gap = 8
    const arrowSize = 6

    let top, left, transform

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap - arrowSize
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        transform = 'translateX(-50%)'
        break
      case 'bottom':
        top = triggerRect.bottom + gap + arrowSize
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        transform = 'translateX(-50%)'
        break
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.left - tooltipRect.width - gap - arrowSize
        transform = 'translateY(-50%)'
        break
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.right + gap + arrowSize
        transform = 'translateY(-50%)'
        break
      default:
        top = triggerRect.top - tooltipRect.height - gap - arrowSize
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        transform = 'translateX(-50%)'
    }

    setPositionStyles({ top, left, transform })
  }, [position])

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      requestAnimationFrame(updatePosition)
    }, delay)
  }, [delay, updatePosition])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', updatePosition, { passive: true })
      window.addEventListener('resize', updatePosition)
    }
    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isVisible, updatePosition])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  }

  const tooltipContent = isVisible && createPortal(
    <div
      ref={tooltipRef}
      className={`
        fixed z-600 px-3 py-2 text-xs font-medium text-white
        bg-slate-900 border border-white/10 rounded-lg shadow-strong
        whitespace-nowrap pointer-events-none animate-fade-in
        ${className}
      `}
      style={positionStyles}
      role="tooltip"
      aria-hidden="true"
    >
      {content}
      {arrow && (
        <div
          className="absolute w-0 h-0 border-3 border-transparent"
          style={{
            ...(position === 'top' && { bottom: '-6px', left: '50%', transform: 'translateX(-50%)', borderTopColor: '#0f172a' }),
            ...(position === 'bottom' && { top: '-6px', left: '50%', transform: 'translateX(-50%)', borderBottomColor: '#0f172a' }),
            ...(position === 'left' && { right: '-6px', top: '50%', transform: 'translateY(-50%)', borderLeftColor: '#0f172a' }),
            ...(position === 'right' && { left: '-6px', top: '50%', transform: 'translateY(-50%)', borderRightColor: '#0f172a' }),
          }}
        />
      )}
    </div>,
    document.body
  )

  return (
    <>
      {typeof children === 'function' ? children(triggerProps) : <span {...triggerProps}>{children}</span>}
      {tooltipContent}
    </>
  )
}

Tooltip.displayName = 'Tooltip'

export { Tooltip }