export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#059669",
      },
      boxShadow: {
        "inner-soft": "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        lg2: "1.25rem",
      },
      ffontFamily: {
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    },
  },
  plugins: [],
};