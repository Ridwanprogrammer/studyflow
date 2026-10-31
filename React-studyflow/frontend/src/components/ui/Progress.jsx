import { forwardRef } from 'react'

const Progress = forwardRef(function Progress({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  className = '',
  ...props
}, ref) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variants = {
    default: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    success: 'bg-emerald-500',
    lime: 'bg-lime-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    violet: 'bg-violet-500',
    discipline: 'bg-gradient-to-r from-blue-500 to-cyan-400', // color via style prop
  }

  const sizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  }

  const baseStyles = `
    relative w-full bg-slate-700/50 rounded-full overflow-hidden
    ${sizes[size]}
  `

  const fillStyles = `
    h-full rounded-full transition-all duration-500 ease-out
    ${variants[variant]}
  `

  return (
    <div ref={ref} className={`${baseStyles} ${className}`} {...props} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div
        className={fillStyles}
        style={{ width: `${percentage}%` }}
      />
      {showLabel && (
        <span className="absolute right-0 top-0 -translate-y-full text-xs font-medium text-slate-400">
          {label || `${Math.round(percentage)}%`}
        </span>
      )}
    </div>
  )
})

Progress.displayName = 'Progress'

// Circular progress
function CircularProgress({
  value = 0,
  max = 100,
  size = 'md',
  strokeWidth = 4,
  variant = 'default',
  showValue = true,
  children,
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const sizes = {
    sm: 40,
    md: 64,
    lg: 80,
    xl: 96,
  }

  const diameter = sizes[size]
  const stroke = strokeWidth

  const variants = {
    default: 'stroke-blue-500',
    success: 'stroke-emerald-500',
    lime: 'stroke-lime-500',
    warning: 'stroke-amber-500',
    danger: 'stroke-rose-500',
    violet: 'stroke-violet-500',
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: diameter, height: diameter }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={children}
    >
      <svg className="transform -rotate-90" width={diameter} height={diameter}>
        <circle
          className="stroke-slate-700/50"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
        <circle
          className={`${variants[variant]} transition-all duration-500 ease-out`}
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-semibold text-white">
            {children || `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
      {!showValue && children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

// Step progress (for multi-step flows)
function StepProgress({
  steps = [],
  currentStep = 0,
  variant = 'default',
  className = '',
}) {
  const variants = {
    default: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    success: 'bg-emerald-500',
  }

  return (
    <div className={`flex items-center gap-4 ${className}`} role="list" aria-label="Progress steps">
      {steps.map((step, index) => {
        const isComplete = index < currentStep
        const isCurrent = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.id || index} className="flex flex-col items-center" role="listitem">
            <div className="relative flex items-center justify-center">
              {!isLast && (
                <div
                  className={`absolute top-4 left-full w-full h-1 ${isComplete ? variants[variant] : 'bg-slate-700/50'}`}
                  style={{ width: '100%' }}
                  aria-hidden="true"
                />
              )}
              <div
                className={`
                  relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                  text-sm font-semibold transition-all duration-300
                  ${isComplete ? `${variants[variant]} text-slate-950` : ''}
                  ${isCurrent && !isComplete ? 'bg-white/10 text-cyan-400 border-2 border-cyan-400' : ''}
                  ${!isCurrent && !isComplete ? 'bg-slate-700/50 text-slate-500 border-2 border-slate-600' : ''}
                `}
              >
                {isComplete ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
            </div>
            <span className={`mt-2 text-xs text-center w-24 ${isCurrent ? 'text-white font-medium' : 'text-slate-500'}`}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export { Progress, CircularProgress, StepProgress }