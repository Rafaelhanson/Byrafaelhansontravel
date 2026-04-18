import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f4f5f2",
        ink: "#0f172a",
        pine: "#23433c",
        sand: "#dac29d",
        sky: "#c4d9e8",
        accent: "#e86c39"
      },
      boxShadow: {
        premium: "0 20px 45px -20px rgba(15, 23, 42, 0.35)"
      },
      borderRadius: {
        soft: "1.25rem"
      },
      backgroundImage: {
        "hero-blend":
          "linear-gradient(120deg, rgba(35,67,60,0.9), rgba(35,67,60,0.4)), radial-gradient(circle at 10% 10%, rgba(232,108,57,0.25), transparent 45%)"
      }
    }
  },
  plugins: []
};

export default config;
