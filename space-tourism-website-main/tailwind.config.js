/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {},
        colors: {
            black: "#0B0D17",
            grey: "#D0D6F9",
            gold: "#FFFFFF",
        },
        fontFamily: {
            sans: ["Barlow Condensed", "sans-serif"],
            serif: ["Bellefair", "serif"],
        },
    },
    plugins: [],
};
