/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9efff',
          500: '#0094d8',
          700: '#006a9c',
          900: '#0b3d57'
        }
      }
    }
  },
  plugins: []
};
