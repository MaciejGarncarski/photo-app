module.exports = {
  "*.{js,jsx,ts,tsx,css,scss,json,md,mdx}": ["pnpm prettier --write"],
  "*.{js,jsx,ts,tsx}": ["pnpm eslint --fix --max-warnings=0 --no-warn-ignored"],
};
