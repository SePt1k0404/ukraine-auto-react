/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      colors: {
        'background-light': 'rgb(179, 187, 187)',
        'background-card-light': '#f9f9f9',
        'main-color': '#3498db',
        'secondary-color': '#2980b9',
        'secondary-text': '#2c3e50',
        'main-red-color': '#ff2e2e',
        'accent-red-color': '#e64141',
        'footer-dark': '#34495e',
        'footer-light': '#2c3e50',
      },
      backgroundImage: {
        'custom-gradient-light': 'linear-gradient(135deg, #ffffff, #f8f9fa)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeInUp: 'fadeInUp 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
