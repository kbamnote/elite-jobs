// Centralized Theme Configuration for JobSeeker Components
// 🎨 Design System Implementation

export const theme = {
  // Color Palette
  colors: {
    // Primary Colors
    primary: '#0F3460',        // Main brand color (navbars, headings, main actions)
    accent: '#E94560',         // Accent color (buttons, hover effects, highlights)
    
    // Background Colors
    background: {
      main: '#F9F7F7',         // Main background color (light, clean, modern)
      white: '#FFFFFF',        // Pure white for cards and sections
      light: '#FAFAFA',        // Slightly off-white for subtle sections
    },
    
    // Dark Shades
    dark: {
      primary: '#1A1A2E',      // Primary dark (text, footer, contrast backgrounds)
      secondary: '#16213E',    // Secondary dark (text, footer, contrast backgrounds)
    },
    
    // Semantic Colors
    success: '#10B981',        // Success states
    warning: '#F59E0B',        // Warning states
    error: '#EF4444',          // Error states
    info: '#3B82F6',           // Info states
    
    // Neutral Colors
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Text Colors
    text: {
      primary: '#1A1A2E',      // Primary text color
      secondary: '#16213E',    // Secondary text color
      muted: '#6B7280',        // Muted text color
      light: '#9CA3AF',        // Light text color
      white: '#FFFFFF',        // White text color
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      heading: '"Helvetica Now", "Helvetica Neue", Helvetica, Arial, sans-serif',
      body: '"Neue Montreal", "Inter", system-ui, -apple-system, sans-serif',
    },
    
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Transitions
  transition: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  }
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  return `
    /* Theme Colors */
    --color-primary: ${theme.colors.primary};
    --color-accent: ${theme.colors.accent};
    --color-background-main: ${theme.colors.background.main};
    --color-background-white: ${theme.colors.background.white};
    --color-background-light: ${theme.colors.background.light};
    --color-dark-primary: ${theme.colors.dark.primary};
    --color-dark-secondary: ${theme.colors.dark.secondary};
    --color-text-primary: ${theme.colors.text.primary};
    --color-text-secondary: ${theme.colors.text.secondary};
    --color-text-muted: ${theme.colors.text.muted};
    --color-text-light: ${theme.colors.text.light};
    --color-text-white: ${theme.colors.text.white};
    
    /* Typography */
    --font-heading: ${theme.typography.fontFamily.heading};
    --font-body: ${theme.typography.fontFamily.body};
    
    /* Transitions */
    --transition-fast: ${theme.transition.fast};
    --transition-normal: ${theme.transition.normal};
    --transition-slow: ${theme.transition.slow};
  `;
};

// Utility functions for consistent styling
export const getButtonStyles = (variant = 'primary') => {
  const baseStyles = {
    fontFamily: theme.typography.fontFamily.body,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.lg,
    transition: theme.transition.normal,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
  };
  
  const variants = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.text.white,
      border: `2px solid ${theme.colors.primary}`,
      '&:hover': {
        backgroundColor: theme.colors.dark.secondary,
        borderColor: theme.colors.dark.secondary,
      }
    },
    accent: {
      backgroundColor: theme.colors.accent,
      color: theme.colors.text.white,
      border: `2px solid ${theme.colors.accent}`,
      '&:hover': {
        backgroundColor: '#d63851',
        borderColor: '#d63851',
      }
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`,
      '&:hover': {
        backgroundColor: theme.colors.primary,
        color: theme.colors.text.white,
      }
    }
  };
  
  return { ...baseStyles, ...variants[variant] };
};

export default theme;