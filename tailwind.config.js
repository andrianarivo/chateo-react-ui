/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#A0E7E5',
      secondary: '#FFAEBC',
      accent: '#FBE7C6'
    },
    extend: {},
  },
  plugins: [],
});

