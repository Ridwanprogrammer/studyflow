import React, { forwardRef } from 'react'
import { Loader2 } from './Icons'

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}, ref) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-semibold
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-3 focus:ring-cyan-400/30
    disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
    select-none
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-cyan-600 text-white
      hover:from-blue-500 hover:to-cyan-500
      hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-white/5 border border-white/10 text-slate-100
      hover:bg-white/10 hover:border-white/20
      backdrop-blur-xl
    `,
    ghost: `
      text-slate-300 bg-transparent
      hover:text-white hover:bg-white/5
    `,
    ai: `
      bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white
      hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-0.5
      active:translate-y-0
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-500 text-white
      hover:from-red-600 hover:to-red-600
      hover:shadow-lg hover:shadow-red-400/25 hover:-translate-y-0.5
      active:translate-y-0
    `,
    outline: `
      border border-cyan-400/55 text-cyan-200 bg-transparent
      hover:bg-cyan-400/10 hover:border-cyan-300 hover:text-white
    `,
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2.5 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl',
    icon: 'p-2.5 rounded-lg',
    'icon-sm': 'p-2 rounded-md',
    'icon-lg': 'p-3 rounded-xl',
  }

  const width = fullWidth ? 'w-full' : ''

  const iconSize = size === 'sm' || size === 'xs' ? 14 : size === 'lg' ? 20 : 16

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin" aria-hidden="true" />
      ) : (
        <>
          {leftIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {React.isValidElement(leftIcon) ? leftIcon : React.createElement(leftIcon, { size: iconSize })}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {React.isValidElement(rightIcon) ? rightIcon : React.createElement(rightIcon, { size: iconSize })}
            </span>
          )}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }