/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sinc: {
          cream: '#F4EFE6',
          ink: '#1A1714',
          border: '#D4CBBC',
          muted: '#8C8070',
          secondary: '#5C5248',
          done: '#6B8F6B',
          danger: '#9B3A2A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
