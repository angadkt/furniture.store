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
        cutomBlueAdmin: '#295F98',
        customBgAdmin: '#EAE4DD',
        customCardAdmin: '#CDC2A5',
        customButtonAdmin: '#F0F0F0',
        customText: '#4764fd',
        customCC: '#dfbc60',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

