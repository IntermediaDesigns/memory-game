/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  'game-bg': '#13151a',
		  'card-bg': '#4c1d95',
		  'card-hover': '#5b21b6',
		},
		spacing: {
		  'card': '150px',
		},
		animation: {
		  'bounce-slow': 'bounce 2s infinite',
		},
		gridTemplateColumns: {
		  'cards-sm': 'repeat(2, minmax(120px, 1fr))',
		  'cards-md': 'repeat(4, minmax(120px, 1fr))',
		  'cards-lg': 'repeat(6, minmax(120px, 1fr))',
		}
	  },
	},
	plugins: [],
  }