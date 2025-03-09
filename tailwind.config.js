/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        keyframes: {
          'icon-fade-1': {
            '0%, 100%': { opacity: '0' },
            '25%': { opacity: '1' },
          },
          'icon-fade-2': {
            '25%': { opacity: '0' },
            '50%': { opacity: '1' },
          },
          'icon-fade-3': {
            '50%': { opacity: '0' },
            '75%': { opacity: '1' },
          },
          'icon-fade-4': {
            '75%': { opacity: '0' },
            '100%': { opacity: '1' },
          }
        },
        animation: {
          'icon-1': 'icon-fade-1 4s ease-in-out infinite',
          'icon-2': 'icon-fade-2 4s ease-in-out infinite',
          'icon-3': 'icon-fade-3 4s ease-in-out infinite',
          'icon-4': 'icon-fade-4 4s ease-in-out infinite'
        }
      }
    },
    plugins: [import("tailwindcss-animate")]
  }