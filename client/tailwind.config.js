/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			bgGradientDeg: {
				75: "75deg",
			},
			fontFamily: {
				sora: ["Sora", "sans-serif"],
				libre: ["Libre Baskerville"],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				white: "#ffffff",
				purple: "#3f3cbb",
				midnight: "#121063",
				metal: "#565584",
				tahiti: "#3ab7bf",
				silver: "#ecebff",
				bubbleGum: "#ff77e9",
				bermuda: "#78dcca",
				bgPrimary: "#131C24",
				bgMiddle: "#271E24",
				bgSecondary: "#622525",
				bgNavBar: "#333333",
				bgPost: "#181515",
			},
		},
	},
	plugins: [
		function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"bg-gradient": (angle) => ({
						"background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
					}),
				},
				{
					values: Object.assign(theme("bgGradientDeg", {}), {
						10: "10deg",
						15: "15deg",
						20: "20deg",
						25: "25deg",
						30: "30deg",
						45: "45deg",
						60: "60deg",
						90: "90deg",
						120: "120deg",
						135: "135deg",
					}),
				}
			);
		},
		function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
	],
};
