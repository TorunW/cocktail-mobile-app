"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHADOWS = exports.FONTS = exports.SPACING = exports.SIZES = exports.COLORS = void 0;
var COLORS = {
  noprimary: '#F7D1D7',
  primary: 'rgba(245, 196, 204, 1)',
  secondary: 'rgba(140, 225, 246, 1)',
  lightTransparent: 'rgba(255,255,255,0.65)',
  darkTransparent: '#00000030',
  pink: 'rgb(252, 239, 241)',
  pinkTransparent: 'rgba(252, 239, 241, 0.6)',
  midPink: '#F6D0D6',
  deepPink: '#F1B3BC',
  deepPinkTransparent: 'rgba(241, 179, 188, 0.8)',
  red: '#DA3E55',
  white: '#F9F4F0',
  grey: '#4C4C4C',
  black: '#2e2e2e',
  black2: '#112A46',
  black2transparent: '#112A4690',
  shadow: '#1F2687'
};
exports.COLORS = COLORS;
var SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  icon: 24,
  iconL: 36
};
/* 12–24 pixels for a large button
24–36 pixels for a medium button
36–48 pixels for a small button */

exports.SIZES = SIZES;
var SPACING = {
  xs: 8,
  s: 16,
  m: 24,
  l: 32,
  xl: 40
};
exports.SPACING = SPACING;
var FONTS = {
  extraBold: 'InterBlack',
  bold: 'InterBold',
  semiBold: 'InterSemiBold',
  medium: 'InterMedium',
  regular: 'InterRegular',
  light: 'InterLight'
};
exports.FONTS = FONTS;
var SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14
  },
  text: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 4
    },
    textShadowRadius: 4
  },
  box: {
    shadowColor: COLORS.black,
    textShadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.37,
    textShadowRadius: 32,
    elevation: 32
  }
};
exports.SHADOWS = SHADOWS;