module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Purge unused styles in production
  purge: {
    enabled: true,
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
  },
}