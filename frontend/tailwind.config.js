/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily:{
        roboto:['roboto','sans-serif'],
        poppins:['poppins','sans-serif'],
      },
      colors:{
        mainBg:'#171717',
        purple:{
          clear:'#31265a',
          darkest:'#16161e',
        },
        primary:'#4F46E5',
        secondary:'#B1B1E5',
        danger:'#E82B2E',
      },
      backgroundImage: {
          'radial-gradient-ct': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
