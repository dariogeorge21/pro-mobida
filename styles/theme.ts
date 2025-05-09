// Theme configuration for the Christus app

// Colors
export const colors = {
  primary: {
    main: '#7C4DFF',
    light: '#9575CD',
    dark: '#5E35B1',
    transparent: 'rgba(124, 77, 255, 0.1)',
  },
  secondary: {
    main: '#B39DDB',
    light: '#D1C4E9',
    dark: '#9575CD',
    transparent: 'rgba(179, 157, 219, 0.1)',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
    elevated: '#F5F5F5',
  },
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
    disabled: '#A0AEC0',
    hint: '#718096',
  },
  accent: {
    main: '#9575CD',
    light: '#B39DDB',
    dark: '#7E57C2',
  },
  success: {
    main: '#48BB78',
    light: '#68D391',
    dark: '#38A169',
  },
  warning: {
    main: '#F6AD55',
    light: '#FBD38D',
    dark: '#ED8936',
  },
  error: {
    main: '#F56565',
    light: '#FC8181',
    dark: '#E53E3E',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Typography
export const typography = {
  fontFamily: {
    heading: 'SFProDisplay-SemiBold',
    subheading: 'SFProDisplay-Medium',
    body: 'SFProText-Regular',
    bodyMedium: 'SFProText-Medium',
    bodySemiBold: 'SFProText-SemiBold',
    sacred: 'Baskerville-Regular',
  },
  fontSize: {
    h1: 24,
    h2: 20,
    h3: 18,
    body: 16,
    caption: 14,
    small: 12,
  },
  lineHeight: {
    heading: 1.2, // 120%
    body: 1.5, // 150%
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
};

// Border radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  rounded: 9999, // For fully rounded elements
};

// Animation durations
export const animationDurations = {
  short: 150, // ms
  medium: 250, // ms
  long: 300, // ms
};

// Export the full theme
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  animationDurations,
};

export default theme;