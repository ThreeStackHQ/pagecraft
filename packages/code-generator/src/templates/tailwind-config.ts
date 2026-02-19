import type { StitchTheme } from '../schema';

export function generateTailwindConfig(theme: StitchTheme): string {
  const config = `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${theme.colors.primary}',
        secondary: '${theme.colors.secondary}',
        accent: '${theme.colors.accent}',
        background: '${theme.colors.background}',
        text: '${theme.colors.text}',${theme.colors.muted ? `\n        muted: '${theme.colors.muted}',` : ''}
      },
      fontFamily: {
        heading: [${JSON.stringify(theme.fonts.heading)}, 'sans-serif'],
        body: [${JSON.stringify(theme.fonts.body)}, 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
`;

  return config;
}
