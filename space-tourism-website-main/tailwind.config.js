/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            keyframes: {
                "slide-out": {
                    "0%": {
                        transform: "translateX(100%)",
                        display: "none",
                    },
                    "100%": {
                        transform: "translateX(0%)",
                        display: "grid",
                    },
                },
                "slide-in": {
                    "0%": {
                        transform: "translateX(0%)",
                        display: "grid",
                    },
                    "100%": {
                        transform: "translateX(100%)",
                        display: "none",
                    },
                },
            },
            animation: {
                "slide-out": "slide-out .5s ease-in-out forwards",
                "slide-in": "slide-in .5s ease-in-out forwards",
            },
        },
        colors: {
            black: "#0B0D17",
            grey: "#D0D6F9",
            gold: "#FFFFFF",
            "dark-grey": "#5a5a5a",
            "h-grey": "#161313",
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
