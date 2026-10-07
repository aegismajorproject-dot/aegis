export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#060b12', panel: '#0d1722', line: '#1b2e3f', cy: '#22d3ee', gr: '#34d399', warn: '#fb923c', crit: '#f43f5e' },
    fontFamily: { mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], sans: ['Inter', 'system-ui', 'sans-serif'] }
  } },
  plugins: []
};
