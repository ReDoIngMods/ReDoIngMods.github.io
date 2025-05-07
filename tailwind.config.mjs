/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'sm-bg': '#1e5270',
        'sm-yellow': '#ffd700',
        'sm-ui': '#2e3539',
        'sm-button-start': '#ffba10',
        'sm-button-end': '#ff8200',
      },
      fontFamily: {
        'sovjet': ['"Shentox"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
