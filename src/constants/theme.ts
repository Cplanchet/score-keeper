
export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    disabled: '#a8a8a8'
  },
  dark: {
    text: '#ffffff',
    background: '#131313',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    disabled: '#565656'
  },
} as const;

export const GlobalColors = {
  primary: "#9d5c63",
  primaryDarker: "#824c52",
  primaryDarkest: "#683d41",
  onPrimary: "#ffffff",
  secondary: "#26547c",
  tertiary: "#92b6b1",
  error: "#ff0000"
} as const

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Typography = {
  headline: {
    fontSize: 36,
    fontWeight: 700,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
  heading: {
    fontSize: 20,
    fontWeight: 700,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
  },
  link: {
    fontSize: 18,
    fontWeight: 700,
  },
  normal: {
    fontSize: 16,
    fontWeight: 400,
  },
  button: {
    fontSize: 14,
    fontWeight: 300,
  },
  subtext: {
    fontSize: 12,
    fontWeight: 200,
  },
} as const

export const MaxContentWidth = 800;
