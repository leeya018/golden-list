import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "color-text-gray": "#A5A9AD",
      "color-hover-gray": "#E8E9EA",
      "color-blue": "#0FB7E2",
      "color-yellow": "#e3ea07",
      "color-red": "#ea0707",
      "color-black": "#070000",
      "color-brown": "#604040",
      "color-green": "#58C99C",
      "color-icon-green": "#58C99C",
      "color-icon-white": "#FFFFFF",
      "color-white": "white",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        login_image: "url('/images/login_image.png')",
        google: "url('/google.png')",
      },
    },
  },
  plugins: [],
}
export default config
