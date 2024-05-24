import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      oswald: ["Oswald"],
      openSans: ["Open Sans"],
      racingSansOne: ["Racing Sans One"],
      montserrat: ["Montserrat"],
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
  // daisyui: {
  //   themes: [
  //     'emerald',
  //     {
  //       'emerald-dark': {
  //         primary: '#66cc8a',
  //         'primary-focus': '#41be6d',
  //         'primary-content': '#f9fafb',

  //         secondary: '#377cfb',
  //         'secondary-focus': '#055bfa',
  //         'secondary-content': '#f9fafb',

  //         accent: '#ea5234',
  //         'accent-focus': '#d03516',
  //         'accent-content': '#f9fafb',

  //         neutral: '#333c4d',
  //         'neutral-focus': '#1f242e',
  //         'neutral-content': '#f9fafb',

  //         'base-100': '#3b424e',
  //         'base-200': '#2a2e37',
  //         'base-300': '#16181d',
  //         'base-content': '#ebecf0',

  //         info: '#1c92f2',
  //         success: '#009485',
  //         warning: '#ff9900',
  //         error: '#ff5724',

  //         '--rounded-box': '1rem',
  //         '--rounded-btn': '.5rem',
  //         '--rounded-badge': '1.9rem',

  //         '--animation-btn': '0',
  //         '--animation-input': '0',

  //         '--btn-text-case': 'uppercase',
  //         '--navbar-padding': '.5rem',
  //         '--border-btn': '1px',
  //       },
  //     },
  //   ],

  //   darkTheme: 'emerald-dark',
  // },
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}
export default config
