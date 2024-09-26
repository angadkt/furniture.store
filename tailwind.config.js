/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        customLigthPurple: '#F2EFFB',
        customDarkPurple: '#e1d8fc',
        customLightYellow: '#e0b852',
        customCardColor: '#F5F5F7',
      },
    },
  },
  plugins: [],
}

