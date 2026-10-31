import React, { forwardRef, useId, useState } from 'react'
import { Search, X, Eye, EyeOff, Loader2, AlertCircle } from './Icons'

const Input = forwardRef(function Input({
  label,
  hint,
  error,
  type = 'text',
  showPasswordToggle = false,
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = '',
  id: providedId,
  ...props
}, ref) {
  const generatedId = useId()
  const id = providedId || generatedId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === 'password' && showPasswordToggle ? (showPassword ? 'text' : 'password') : type

  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  const baseStyles = `
    w-full px-4 py-3 text-sm text-white
    bg-slate-950/60 border border-slate-700/50
    rounded-lg placeholder:text-slate-500
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:bg-slate-950/95 focus:border-cyan-400 focus:ring-3 focus:ring-cyan-400/20 focus:outline-none
  `

  const labelStyles = `
    block text-sm font-medium text-slate-300 mb-2
    peer-focus:text-cyan-400
  `

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
          {props.required && <span className="text-rose-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-colors peer-focus:text-cyan-400" aria-hidden="true">
            {React.isValidElement(leftIcon) ? leftIcon : React.createElement(leftIcon, { size: 18 })}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type={inputType}
          disabled={disabled || loading}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          aria-busy={loading}
          className={`${baseStyles} ${leftIcon ? 'pl-11' : ''} ${rightIcon || showPasswordToggle || loading ? 'pr-11' : ''} ${className}`}
          {...props}
        />
        {loading && (
          <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-cyan-400" aria-hidden="true" />
        )}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-hidden="true"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {rightIcon && !showPasswordToggle && !loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true">
            {React.isValidElement(rightIcon) ? rightIcon : React.createElement(rightIcon, { size: 18 })}
          </span>
        )}
        {error && !loading && (
          <button
            type="button"
            onClick={() => { if (ref.current) ref.current.value = '' }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            aria-label="Clear input"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

// SearchInput - specialized for search with clear button
const SearchInput = forwardRef(function SearchInput({
  label = 'Search',
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  className = '',
  ...props
}, ref) {
  const [localValue, setLocalValue] = useState(value || '')
  const handleChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange?.(e)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange?.({ target: { value: '' } })
    onClear?.()
  }

  return (
    <div className="relative">
      <label htmlFor={props.id || 'search'} className="sr-only">{label}</label>
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-colors peer-focus:text-cyan-400" aria-hidden="true" />
      <input
        ref={ref}
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 text-sm text-white bg-slate-950/60 border border-slate-700/50 rounded-lg placeholder:text-slate-500 transition-all duration-200 focus:bg-slate-950/95 focus:border-cyan-400 focus:ring-3 focus:ring-cyan-400/20 focus:outline-none"
        {...props}
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
})

SearchInput.displayName = 'SearchInput'

export { Input, SearchInput }