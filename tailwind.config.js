/** @type {import('tailwindcss').Config} */
export default {
	safelist: [{ pattern: /basis-(.*)\/12/ }, { pattern: /gap-(.*)/ }],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			flexBasis: {
				'12/12': '100%',
			},
			fontFamily: {
				sans: ['Spoqa Han Sans Neo', 'Noto Sans KR', 'sans-serif'],
				serif: ['Noto Serif KR', 'serif'],
			},
		},
	},
	plugins: [],
}
