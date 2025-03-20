// Where all custom/global tailwind styles are configured.

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark: mode via prefix class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // Set my global application styles.
    extend: {
      // Color pallette
      colors: {
        gold: '#B88E2F', /* primary */
        'gold-light': '#FCF8F3',
        'gold-light-2': '#F9F1E7',
        'gold-light-3': '#F2E1C9',
        'gold-dark-1': '#D0A56A',
        'gold-dark-2': '#C58E3B',
        'gold-dark-3': '#A97438',
        'grey-100': '#F4F5F7', // lighter
        'grey-200': '#B0B0B0', // lighter
        'grey-300': '#9F9F9F', // lighter
        'grey-400': '#898989', // light
        'grey-500': '#666666', // light
        'grey-700': '#3A3A3A', // Dark
        'grey-800': '#333333', // Dark
        green: '#2EC1AC',
        red: '#E97171',
      },
      backgroundImage: {
        'instagram': 'linear-gradient(315deg, #f58529, #feda77, #dd2a7b, #8134af, #515bd4)',
      },
      fontFamily: {
        sans: ['Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'],
      },
      fontSize: {
        base: ['1em', {
          lineHeight: '1.5em',
          fontWeight: '400'
        }],
        xl: ['1.125em', {
          lineHeight: '1.5em',
          fontWeight: '400'
        }], /* 18px p-TAG*/
        '2xl': ['1.25em', {
          lineHeight: '1.5em',
          fontWeight: '600'
        }], /* 20px h6-tag*/
        '3xl': ['1.5em', {
          lineHeight: '1.2em',
          fontWeight: '600'
        }], /* 24px h5-tag */
        '4xl': ['1.75em', {
          lineHeight: '1.2em',
          fontWeight: '600'
        }], /* 28px h4-tag */
        'logo': ['2.125em', {
          lineHeight: '1.2em',
          letterSpacing: '.05em',
          fontWeight: '700'
        }], /* 34px h~-tag */
        '5xl': ['2em', {
          lineHeight: '1.2em',
          fontWeight: '700'
        }], /* 40px h3-tag */
        '6xl': ['3em', {
          lineHeight: '1.5em',
          fontWeight: '700'
        }], /* 48px h2-tag */
        '7xl': ['3.25em', {
          lineHeight: '65px',
          fontWeight: '700'
        }], /* 52px h1-tag */
      },
    },
  },
  plugins: [],
}

