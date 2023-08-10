/** @type {import('tailwindcss').Config} */
export default {
	safelist: [
		'basis-1/12',
		'basis-2/12',
		'basis-3/12',
		'basis-4/12',
		'basis-5/12',
		'basis-6/12',
		'basis-7/12',
		'basis-8/12',
		'basis-9/12',
		'basis-10/12',
		'basis-11/12',
		'basis-12/12',
	],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Noto Sans KR', 'sans-serif'],
			serif: ['Noto Serif KR', 'serif'],
		},
		extend: {
			flexBasis: {
				'12/12': '100%',
			},
		},
	},
	plugins: [],
}
