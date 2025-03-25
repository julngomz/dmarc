export default {
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#fff1f0',
          100: '#ffe4e0',
          200: '#fecdc5',
          300: '#fda893',
          400: '#ff7e61', // Main coral/orange used in buttons and accents
          500: '#ff5c3a', // Brighter coral used in headings
          600: '#ea4326',
          700: '#d3331d',
          800: '#ab2c1c',
          900: '#8c291d',
        },
        // Secondary colors
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Blue used in cards and interface elements
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Accent colors
        accent: {
          green: '#85d147', // Green used in cards
          yellow: '#ffd147', // Yellow used in UI elements
          purple: '#8675ff', // Purple used in some elements
        },
        // Background colors
        background: {
          cream: '#fff7ed', // Main background color (peach/cream)
          light: '#ffffff', // White background for cards
          card: '#f8fafc', // Slight off-white for card backgrounds
        },
        // Text colors
        text: {
          primary: '#0f172a', // Dark text color for headings
          secondary: '#475569', // Secondary text color for paragraphs
          muted: '#94a3b8', // Muted text color
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'], // For headlines
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }], // 10px
      },
      borderRadius: {
        '4xl': '2rem', // 32px for large rounded corners
        '5xl': '2.5rem', // 40px for very large rounded corners
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.09)',
        'button': '0 4px 8px rgba(255, 92, 58, 0.25)',
      },
    },
  },
  plugins: [],
};
