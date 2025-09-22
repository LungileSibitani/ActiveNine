/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #1e2932, #2e3b48, #3c4d5b)',
      },
      colors: {
        'navy-dark': '#1e2932',
        'bluish-gray': '#2e3b48',
        'smoky-blue': '#3c4d5b',
        'warm-orange': '#f4a261',
        'light-gray': '#f8f9fa',
        'off-white': '#fefefe',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #f4a261' },
          to: { boxShadow: '0 0 30px #f4a261, 0 0 40px #f4a261' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        '3d': '0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2)',
        'inner-3d': 'inset 0 2px 4px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
};
