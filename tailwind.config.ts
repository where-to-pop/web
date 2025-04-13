/** @type {import('tailwindcss').Config} */

import { extendTailwindMerge } from 'tailwind-merge';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${i * 4}px` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    spacing: PX_ENTRIES,
    fontSize: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
    },
    fontWeight: {
      400: '400',
      500: '500',
      600: '600',
      700: '700',
      800: '800',
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial'],
    },
    borderRadius: {
      none: '0px',
      4: '4px',
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      24: '24px',
      full: '9999px',
    },
    zIndex: {
      base: '1',
      nav: '2',
      popup: '999',
      floating: '1000',
    },
    colors: {
      transparent: 'transparent',
      white: 'rgb(var(--white) / <alpha-value>)',
      black: 'rgb(var(--black) / <alpha-value>)',
      grey: {
        50: 'rgb(var(--grey-50) / <alpha-value>)',
        100: 'rgb(var(--grey-100) / <alpha-value>)',
        200: 'rgb(var(--grey-200) / <alpha-value>)',
        300: 'rgb(var(--grey-300) / <alpha-value>)',
        400: 'rgb(var(--grey-400) / <alpha-value>)',
        500: 'rgb(var(--grey-500) / <alpha-value>)',
        600: 'rgb(var(--grey-600) / <alpha-value>)',
        700: 'rgb(var(--grey-700) / <alpha-value>)',
      },
      primary: 'rgb(var(--primary) / <alpha-value>)',
      red: 'rgb(var(--red) / <alpha-value>)',
    },
  },
  plugins: [],
};

export default config;

const flattenColors = (colors: object, prefix = ''): string[] => {
  return Object.entries(colors).reduce((acc: string[], [key, value]) => {
    if (typeof value === 'object') {
      return [
        ...acc,
        ...flattenColors(value, prefix ? `${prefix}.${key}` : key),
      ];
    }
    return [...acc, prefix ? `${prefix}.${key}` : key];
  }, []);
};

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: Object.keys(config.theme?.fontSize ?? {}) }],
      'font-weight': [{ font: Object.keys(config.theme?.fontWeight ?? {}) }],
      'bg-color': [{ bg: flattenColors(config.theme?.colors ?? {}) }],
      'text-color': [{ text: flattenColors(config.theme?.colors ?? {}) }],
      'border-color': [{ border: flattenColors(config.theme?.colors ?? {}) }],
    },
  },
});
