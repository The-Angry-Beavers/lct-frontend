/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Gazprombank Sans", "sans-serif"],
				superslanted: ["Halvar Breitschrift SuperSlanted", "sans-serif"],
				halvarSuper: ["Halvar Breitschrift SuperSlanted", "sans-serif"],
				halvar: ["Halvar Breitschrift", "sans-serif"],
				gzbank: ["Gazprombank Sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
