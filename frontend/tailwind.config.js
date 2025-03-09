/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',    // If using the app directory
      './pages/**/*.{js,ts,jsx,tsx}',  // If you still have a pages directory
      './components/**/*.{js,ts,jsx,tsx}', 
      // Or wherever else you store components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  