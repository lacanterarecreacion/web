/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Atkinson", "sans"],
      hand: ["trashhand", "sans-serif"],
      // mono: ["Unbounded", "sans-serif"],
    },
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        overlayHide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentHide: {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -52%) scale(0.96)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayHide: 'overlayHide 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
