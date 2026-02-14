/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#259df4",
                "background-light": "#f5f7f8",
                "background-dark": "#101a22",
            },
            fontFamily: {
                // Add font families if needed
            }
        },
    },
    plugins: [],
}
