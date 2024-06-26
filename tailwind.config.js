/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    mode: 'jit',
    theme: {
        extend: {
            extend: {
                keyframes: {
                    'input-focus': {
                        '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                        '50%': { transform: 'scale(1.1)', opacity: '0.7' },
                    },
                },
                animation: {
                    'input-focus': 'input-focus 0.5s ease-in-out',
                },
            },
        },
    },
    plugins: [],
};
