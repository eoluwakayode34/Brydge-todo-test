/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '',
				},
			},
			fontFamily: {
				sans: ['Roboto', 'Helvetica', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
