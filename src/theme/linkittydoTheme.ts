/**
 * LinkittyDo Theme for TreeSleuth
 * 
 * A playful mid-century/retro aesthetic with bold colors,
 * simple geometric shapes, and strong visual hierarchy.
 */

export const linkittydoTheme = {
  colors: {
    // Primary palette
    cream: '#FDEC92',      // Primary background, warm and inviting
    mint: '#A9EAD2',       // Secondary background, panels, accents
    ink: '#161813',        // Primary text, dark elements
    pop: '#FB2B57',        // CTAs, highlights, alerts
    paper: '#EEEDE5',      // Neutral background, cards
    
    // Supporting colors
    forest: '#5E6554',     // Muted text, secondary elements
    moss: '#A29A61',       // Subtle accents, borders
    bark: '#8B7355',       // Tree-themed accent, warm brown
    leaf: '#4A7C59',       // Success states, nature accent
    
    // Functional colors
    success: '#4A7C59',
    warning: '#E7A790',
    error: '#FB2B57',
    info: '#A9EAD2',
  },
  
  fonts: {
    // Headlines, logo-like text
    display: '"Bungee", "Impact", sans-serif',
    // UI elements, body text
    body: '"Nunito", "Segoe UI", sans-serif',
    // Monospace for stats, timers
    mono: '"JetBrains Mono", "Consolas", monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '2.5rem',  // 40px
    '4xl': '3rem',    // 48px
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  
  shadows: {
    sm: '2px 2px 0px var(--ld-ink)',
    md: '4px 4px 0px var(--ld-ink)',
    lg: '6px 6px 0px var(--ld-ink)',
    soft: '0 4px 12px rgba(22, 24, 19, 0.15)',
  },
  
  borders: {
    thin: '2px solid var(--ld-ink)',
    thick: '4px solid var(--ld-ink)',
  },
  
  transitions: {
    fast: '150ms ease-out',
    normal: '250ms ease-out',
    slow: '400ms ease-out',
  },
} as const

export type Theme = typeof linkittydoTheme
export default linkittydoTheme
