/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#12141C",
                secondary: "#262A39",
                gris: "#D1D5DB"
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
    plugins: [],
};
