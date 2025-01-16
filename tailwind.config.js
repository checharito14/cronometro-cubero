/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#12141C",
                vulcan: {
                    50: "#f5f6fa",
                    100: "#ebedf3",
                    200: "#d2d6e5",
                    300: "#abb5ce",
                    400: "#7e8db2",
                    500: "#5e6f99",
                    600: "#4a587f",
                    700: "#3d4767",
                    800: "#353d57",
                    900: "#30374a",
                    950: "#12141c",
                },

                secondary: "#262A39",
                gris: "#D1D5DB",
            },
            fontSize: {
                xxl: "8rem",
            },
            fontFamily: {
                sans: ["Agdasima", "sans-serif"],
                vietnam: ["Be Vietnam Pro", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
