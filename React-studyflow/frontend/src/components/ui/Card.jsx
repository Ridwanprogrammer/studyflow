import { forwardRef } from 'react'

const Card = forwardRef(function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  as: Component = 'div',
  ...props
}, ref) {
  const variants = {
    default: `
      glass-panel
      bg-gradient-to-br from-slate-900/95 to-slate-950/98
      border-slate-700/50
      shadow-card
    `,
    strong: `
      glass-panel-strong
      border-white/20
    `,
    raised: `
      glass-panel-raised
      border-white/15
    `,
    course: `
      glass-panel
      min-h-[240px] flex flex-col gap-3.5
      relative overflow-hidden cursor-pointer
      border-slate-700/50
      bg-gradient-to-br from-slate-900/95 to-slate-950/95
      shadow-card
      transition-all duration-300 ease-out
    `,
    topic: `
      glass-panel
      border-l-4 border-transparent
      hover:border-l-cyan-500 hover:bg-white/5 hover:translate-x-1
      transition-all duration-200
    `,
    empty: `
      glass-panel
      border-dashed border-white/10
      text-center
    `,
    glossary: `
      glass-panel
      border-slate-700/50
      hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]
      transition-all duration-300
    `,
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const hoverStyles = hover && variant !== 'course' ? `
    hover:border-white/20 hover:shadow-strong hover:-translate-y-1
    transition-all duration-300 ease-out
  ` : ''

  const courseHoverStyles = variant === 'course' ? `
    hover:border-cyan-400/40
    hover:bg-gradient-to-br from-slate-800/95 to-slate-900/95
    hover:shadow-[0_20px_42px_rgba(0,0,0,0.32),0_0_20px_rgba(6,182,212,0.1)]
  ` : ''

  return (
    <Component
      ref={ref}
      className={`${variants[variant]} ${paddings[padding]} ${hoverStyles} ${courseHoverStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
})

Card.displayName = 'Card'

export { Card }