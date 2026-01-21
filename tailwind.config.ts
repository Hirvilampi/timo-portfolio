// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flash: {
          '0%': { color: 'inherit' },
          '50%': { color: '#ef4444' }, // Muuttuu punaiseksi (text-red-500)
          '100%': { color: 'inherit' }, // Palaa takaisin
        },
      },
      animation: {
        'flash-once': 'flash 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;