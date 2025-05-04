/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF0000',
          hover: '#CC0000',
          light: '#FFCCCC',
          dark: '#990000',
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          hover: '#333333',
          light: '#E6E6E6',
          dark: '#000000',
        },
        success: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
          light: '#BBF7D0',
          dark: '#15803D',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FDE68A',
          dark: '#B45309',
        },
        error: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#FEE2E2',
          dark: '#B91C1C',
        },
        info: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
        gray: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary-hover': theme('colors.primary.hover'),
      }),
      textColor: theme => ({
        ...theme('colors'),
        'primary-hover': theme('colors.primary.hover'),
      }),
      borderColor: theme => ({
        ...theme('colors'),
        'primary-hover': theme('colors.primary.hover'),
      }),
      ringColor: {
        'hero-red': 'var(--primary)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
