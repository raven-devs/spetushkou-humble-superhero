module.exports = {
  './src/**/*.{js,jsx,ts,tsx}': ['eslint --quiet'], // npm run lint:errors
  '**/*': ['prettier --write --ignore-unknown'], // npm run format
};
