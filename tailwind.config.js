import daisyui from "daisyui"


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },

  darkMode: 'selector',
  plugins: [
    daisyui,
  ],
  daisyui: {
      themes: [
        {
          kaze: {
            "primary": "#4f46e5",
            "secondary": "#1d4ed8",
            "accent": "#bae6fd",
            "neutral": "#fbcfe8",
            "base-100": "#ffffff",
            "info": "#fde047",
            "success": "#84cc16",
            "warning": "#fb7185",
            "error": "#ff0000",
          },
      },
    ],
  },
}

