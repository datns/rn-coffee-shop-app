import {createTheme} from '@shopify/restyle';

export const SPACING = {
  spacing_8: 8,
  spacing_12: 12,
  spacing_18: 18,
  spacing_24: 24,
  spacing_30: 30,
  spacing_36: 36,
};

export const BORDER_RADIUS = {
  radius_8: 8,
  radius_10: 10,
};

const theme = createTheme({
  colors: {
    primaryRed: '#DC3535',
    primaryOrange: '#D17842',
    primaryBlack: '#0C0F14',
    primaryWhite: '#FFFFFF',
    darkGrey: '#252A32',
    mediumGrey: '#52555A',
    lightGrey: '#AEAEAE',
    primaryBlackRGBA: 'rgba(12,15,20,0.5)',
  },
  spacing: SPACING,
  fontSize: {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_24: 24,
    size_28: 28,
    size_30: 30,
  },
  borderRadii: BORDER_RADIUS,
  textVariants: {
    text_1: {
      fontSize: 28,
      fontFamily: 'Poppins-SemiBold',
    },
  },
});

export type Theme = typeof theme;
export default theme;
