/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#05060a',
        charcoal: '#0d0f14',
        slate850: '#151922',
        slate750: '#1e242f',
        ash: '#7a8191',
        bone: '#e8eaf0',
        ember: '#ff6a2c',
        emberSoft: '#ffa96b',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        display: '-0.03em',
        label: '0.22em',
      },
      maxWidth: {
        content: '72rem',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
