/**@type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"DM Sans"', 'sans-serif'],
                serif: ['Newsreader', 'serif'],
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'lofi'],
    },
}
