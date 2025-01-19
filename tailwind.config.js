// Where all custom/global tailwind styles are configured.

/** @type {import('tailwindcss').Config} */
export default {
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
        'gold-light-2': '#FFF3E3',
        'gold-light-3': '#F9F1E7',
        'grey-100': '#F4F5F7', // lighter
        'grey-200': '#B0B0B0', // lighter
        'grey-300': '#9F9F9F', // lighter
        'grey-400': '#898989', // light
        'grey-500': '#666666', // light
        'grey-700': '#333333', // Dark - title
        'grey-800': '#3A3A3A', // Dark
        green: '#2EC1AC',
        red: '#E97171',
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
        '6xl': ['2.5em', {
          lineHeight: '1.5em',
          fontWeight: '700'
        }], /* 48px h2-tag */
        '7xl': ['3.5em', {
          lineHeight: '65px',
          fontWeight: '700'
        }], /* 56px h1-tag */
      },
    },
  },
  plugins: [],
}

