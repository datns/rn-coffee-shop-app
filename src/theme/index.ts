import {createTheme} from '@shopify/restyle';

export const SPACING = {
  spacing_4: 4,
  spacing_8: 8,
  spacing_12: 12,
  spacing_16: 16,
  spacing_18: 18,
  spacing_20: 20,
  spacing_24: 24,
  spacing_30: 30,
  spacing_36: 36,
};

export const BORDER_RADIUS = {
  radius_8: 8,
  radius_10: 10,
  radius_16: 26,
  radius_20: 20,
  radius_24: 24,
};

export const COLORS = {
  primaryRed: '#DC3535',
  primaryOrange: '#D17842',
  primaryBlack: '#0C0F14',
  secondBlack: '#141921',
  primaryWhite: '#FFFFFF',
  darkGrey: '#252A32',
  mediumGrey: '#52555A',
  lightGrey: '#AEAEAE',
  primaryBlackRGBA: 'rgba(12,15,20,0.6)',
};

export const FONT_SIZE = {
  font_10: 10,
  font_12: 12,
  font_14: 14,
  font_16: 16,
  font_18: 18,
  font_20: 20,
  font_28: 28,
};

export const FONT_FAMILY = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

const theme = createTheme({
  colors: COLORS,
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
      fontSize: FONT_SIZE.font_28,
      fontFamily: 'Poppins-SemiBold',
    },
    text_14: {
      fontSize: FONT_SIZE.font_14,
      fontFamily: 'Poppins-SemiBold',
    },
    text_10: {
      fontSize: FONT_SIZE.font_10,
      fontFamily: 'Poppins-Regular',
      color: 'primaryWhite',
      lineHeight: 20,
    },
    text_16: {
      fontSize: FONT_SIZE.font_16,
      fontFamily: 'Poppins-SemiBold',
      color: 'primaryWhite',
    },
    text_18: {
      fontSize: FONT_SIZE.font_18,
      fontFamily: 'Poppins-SemiBold',
    },
    text_20: {
      fontSize: FONT_SIZE.font_20,
      fontFamily: 'Poppins-SemiBold',
    },
    defaults: {
      fontFamily: 'Poppins-Regular',
      color: 'primaryWhite',
      fontSize: FONT_SIZE.font_12,
    },
  },
});

export type Theme = typeof theme;
export default theme;
