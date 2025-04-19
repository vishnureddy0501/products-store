module.exports = {
  content: [
    "./index.html",       // For Vite or HTML projects
    "./src/**/*.{js,ts,jsx,tsx}", // For React/Next.js projects
  ],
  theme: {
    extend: {},
    fontSize: {
      base: '1rem', // Ensures the base font size is 16px (1rem)
    },
  },
  plugins: [],
};
