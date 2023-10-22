/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      minWidth: {
        10: '40px'
      },
      minHeight: {
        48: '12rem',
        96: '24rem'
      },
      maxWidth: {
        '90vw': '90vw'
      }
    }
  },
  plugins: []
};
