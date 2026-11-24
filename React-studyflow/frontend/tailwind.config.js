/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - EXACT from studyflow reference
        brand: {
          cyan: '#007cfe',        // Primary actions and active states
          blue: '#0757cf',        // Secondary actions and deep brand blue
          lime: '#b9e201',        // Success, progress, Math discipline (bright lime)
          green: '#3eaf00',       // Success messages (green)
        },
        // Surface colors - EXACT from studyflow reference
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          // Refined surface tokens matching reference
          panel: 'rgba(12, 18, 27, 0.72)',
          'panel-strong': 'rgba(14, 22, 31, 0.96)',
          'panel-raised': 'rgba(16, 23, 32, 0.9)',
          bg: '#071018',           // Dark navy (not OLED black)
          'bg-elevated': '#0b1723',
          'bg-overlay': '#101d2d',
        },
        // Text colors - EXACT from studyflow reference
        text: {
          primary: '#edf4ff',      // Warm white
          secondary: '#e9f0fa',    // Soft white
          muted: '#8b99ac',        // Muted slate
          inverse: '#071018',      // Dark navy
        },
        // Accent colors - matching reference
        accent: {
          cyan: '#54baff',         // Bright cyan
          lime: '#d7f671',         // Bright lime
          violet: '#9ea8ff',       // Violet
        },
        // Discipline colors - distinct and accessible
        discipline: {
          math: '#007cfe',         // blue
          cs: '#6341f0',           // purple (from reference course page)
          phys: '#f59e0b',         // amber
          chem: '#3eaf00',         // green
          starred: '#b9e201',      // lime
          entrepren: '#ec4899',    // rose
          practicum: '#f59e0b',    // amber
        },
        // Border colors - matching reference
        border: {
          weak: 'rgba(180, 205, 226, 0.08)',
          DEFAULT: 'rgba(180, 205, 226, 0.12)',
          strong: 'rgba(180, 205, 226, 0.2)',
          focus: '#007cfe',
        },
        // Glow effects - matching reference
        glow: {
          cyan: 'rgba(0, 124, 254, 0.15)',
          math: 'rgba(0, 124, 254, 0.18)',
          cs: 'rgba(99, 65, 240, 0.18)',
          phys: 'rgba(245, 158, 11, 0.18)',
          chem: 'rgba(62, 175, 0, 0.18)',
          starred: 'rgba(185, 226, 1, 0.18)',
          entrepren: 'rgba(236, 72, 153, 0.18)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        logo: ['Lemon', 'cursive'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Fluid type scale - matching reference
        'display-xl': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(1.35rem, 2vw, 1.75rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-md': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-sm': ['clamp(1rem, 1.25vw, 1.25rem)', { lineHeight: '1.35', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'eyebrow': ['0.75rem', { fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }],
        'eyebrow-sm': ['0.6875rem', { fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '16px',        // Reference uses 16px
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
        // Consistent card radii
        'card': '16px',      // Match reference
        'button': '10px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'strong': '0 12px 28px rgba(0, 0, 0, 0.2)',
        'glow-cyan': '0 0 0 1px rgba(1, 169, 254, 0.25), 0 0 20px rgba(1, 169, 254, 0.1)',
        'glow-green': '0 0 0 1px rgba(62, 175, 0, 0.25), 0 0 20px rgba(62, 175, 0, 0.1)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        'card': '0 4px 40px rgba(0, 0, 0, 0.15)',  // Reference shadow
        'card-hover': '0 20px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(1, 169, 254, 0.2)',
        'elevated': '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(180, 205, 226, 0.1)',
      },
      backgroundImage: {
        'bg-gradient': 'radial-gradient(ellipse at 85% 0%, rgba(0, 124, 254, 0.12), transparent 40%), radial-gradient(ellipse at 15% 100%, rgba(16, 75, 171, 0.08), transparent 42%)',
        'card-gradient': 'linear-gradient(145deg, rgba(14, 22, 31, 0.95), rgba(10, 20, 31, 0.98))',
        'card-hover': 'linear-gradient(145deg, rgba(20, 30, 42, 0.98), rgba(14, 22, 31, 0.98))',
      },
      transitionDuration: {
        'fast': '120ms',
        'snappy': '180ms',     // Reference uses 180ms
        'smooth': '260ms',     // Reference uses 260ms
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        scaleOut: { '0%': { opacity: '1', transform: 'scale(1)' }, '100%': { opacity: '0', transform: 'scale(0.96)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        spin: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        bounceSubtle: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        accordionDown: { '0%': { height: '0', opacity: '0' }, '100%': { height: 'var(--radix-accordion-content-height)', opacity: '1' } },
        accordionUp: { '0%': { height: 'var(--radix-accordion-content-height)', opacity: '1' }, '100%': { height: '0', opacity: '0' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.15s ease-in',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-out': 'scaleOut 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin': 'spin 1s linear infinite',
        'bounce-subtle': 'bounceSubtle 2.5s ease-in-out infinite',
        'accordion-down': 'accordionDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up': 'accordionUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}