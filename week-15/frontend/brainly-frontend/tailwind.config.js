/** @type {import('tailwindcss').Config} */

export default  {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}", // Adjust paths to match your project structure
    ],
    theme: {
      extend: {colors:{
        purple : {
            650 : "#5046e4"
        }
      }},
    },
    plugins: [],
  };
  