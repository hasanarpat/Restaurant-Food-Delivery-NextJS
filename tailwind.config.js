/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-white',
    'text-black',
    'bg-white',
    'bg-black',
    'text-green-100',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#DA291C', // Pantone Red 032 C (McDonald's red)
          600: '#c41e1a',
          700: '#a81917',
          800: '#8a1614',
          900: '#6b1311',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6900', // Pantone 1585 C (vibrant orange)
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#FFD100', // Pantone Yellow (bright yellow)
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        cream: '#fff5f0', // Warmer cream for food brand
        dark: {
          bg: '#1a0f0a',
          card: '#2d1810',
          border: '#3d2418',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.563rem', { lineHeight: '1.25' }],
        '3xl': ['1.953rem', { lineHeight: '1.25' }],
        '4xl': ['2.441rem', { lineHeight: '1.25' }],
        '5xl': ['3.052rem', { lineHeight: '1.25' }],
        '6xl': ['3.815rem', { lineHeight: '1.25' }],
        '7xl': ['4.768rem', { lineHeight: '1.25' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px 0 rgba(0, 0, 0, 0.1)',
        glow: '0 0 20px rgba(218, 41, 28, 0.4)', // Red glow
        'glow-lg': '0 0 30px rgba(218, 41, 28, 0.5)', // Stronger red glow
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero':
          'linear-gradient(135deg, #DA291C 0%, #FF6900 50%, #FFD100 100%)', // Red to Orange to Yellow
        'gradient-hero-dark':
          'linear-gradient(135deg, #6b1311 0%, #7c2d12 50%, #1a0f0a 100%)',
        'gradient-button': 'linear-gradient(135deg, #DA291C 0%, #FF6900 100%)', // Red to Orange
        'gradient-button-hover':
          'linear-gradient(135deg, #c41e1a 0%, #ea580c 100%)', // Darker on hover
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionDuration: {
        400: '400ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
