/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      rotate: {
        'y-45': '45deg',
      },
    },
  },
  animation: {
    slideIn: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
