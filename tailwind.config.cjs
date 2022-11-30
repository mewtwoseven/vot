/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['prettier', ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
      prose: ['pretty'],
    },
    extend: {
      colors: {
        primary: '#209CEE',
        secondary: '#ADF',
        tertiary: '#DDD',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['active', 'focus'],
      textColor: ['active', 'focus']
    },
  },
};
