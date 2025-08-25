/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige-200': '#f5f5dc',
        'offblack-600': '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      borderRadius: {
        '24': '1.5rem',
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
        'slide-out-left': 'slide-out-left 0.7s ease-out forwards',
        'card-expand': 'card-expand 0.7s ease-in-out forwards',
        'card-collapse': 'card-collapse 0.7s ease-in-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-out forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(120deg)' },
          '66%': { transform: 'translateY(5px) rotate(240deg)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0%)', opacity: '1' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        'card-expand': {
          '0%': { width: '11.11%' },
          '100%': { width: '66.67%' },
        },
        'card-collapse': {
          '0%': { width: '66.67%' },
          '100%': { width: '11.11%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      width: {
        'card-active': '66.67%',
        'card-inactive': '11.11%',
      },
      backgroundSize: {
        '100': '100% 100%',
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
};