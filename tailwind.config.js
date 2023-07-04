/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/pages/**/*.{tsx,ts}', './src/components/**/*.{tsx,js}'],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#41A0FF',
					200: '#0080FF',
					300: '#005FBC',
				},
				gray: {
					100: '#EEEEEE',
					200: '#CCCCCC',
					300: '#BBBBBB',
					400: '#AAAAAA',
					500: '#121212',
				},
			},
			fontFamily: {
				sans: ['Roboto', 'Helvetica', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
