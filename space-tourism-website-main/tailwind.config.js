/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            keyframes: {
                "slide-in": {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
            animation: {
                "slide-in": "slide-in 3s ease-in-out forwards",
            },
        },
        colors: {
            black: "#0B0D17",
            grey: "#D0D6F9",
            gold: "#FFFFFF",
            "dark-grey": "rgb(64, 64, 64)",
        },
        fontFamily: {
            sans: ["Barlow Condensed", "sans-serif"],
            serif: ["Bellefair", "serif"],
        },
        fontSize: {
            sm: ["19px"],
            "sm+": ["21px"],
        },
    },
    plugins: [],
};
