import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
        primary: {
            DEFAULT: '#D1E50C',
            200: '#9DAC09',
            300: '#F3F9C2',
            400: '#DDEC49',
        },
        background: {
            DEFAULT: '#131313',
            100: '#201F20',
            500: '#141B34',
            600: '#19191F',
        },
        main: {
            DEFAULT: '#FFFFFF',
            300: '#FDFEF3',
            400: '#F2F4F3',
            500: '#F5F5F7',
            600: '#F4F4F6',
            700: '#FDFEF3'
        },
        secondary: {
            DEFAULT: '#B6B6C0',
            400: '#E9E9EA',
            500: '#D9D9D9',
            600: '#6C6D80',
            800: '#959595',
        },
        error: '#FF4051',
        badge: {
            red: '#BC2200',
        },
        card: {
            primary: {
                50: '#DBF08400',
                DEFAULT: '#C2D671'
            },
            blue: {
                50: '#84DDF000',
                DEFAULT: '#71D6C4',
            },
            purple: {
                50: '##F084EC00',
                DEFAULT: '##8571D6'
            }
        }
    },
    fontFamily: {
      syne: ['var(--font-syne)', 'sans-serif'],
      inter: ['var(--font-inter)', 'sans-serif'],
      chivo: ['var(--font-chivo)', 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;
