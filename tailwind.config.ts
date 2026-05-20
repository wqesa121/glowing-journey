import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 1px 2px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        border: 'hsl(240 6% 26%)',
        input: 'hsl(240 6% 10%)',
        ring: 'hsl(199 89% 48%)',
        background: 'hsl(240 10% 4%)',
        foreground: 'hsl(240 5% 96%)'
      }
    }
  },
  plugins: []
};

export default config;
