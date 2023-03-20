export const COLORS = {
  //primary: '#F7D1D7',
  primary: '#F5C4CC',
  secondary: '#ACE1F6',

  grad1: '#F0AAB5',
  grad2: '#F5C4CC',
  grad3: '#F9DEE3',

  white: '#F9F4F0',
  black: '#0F0805',

  shadow: '#1F2687',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

/* 12–24 pixels for a large button
24–36 pixels for a medium button
36–48 pixels for a small button */
export const SPACING = {
  xs: 8,
  s: 16,
  m: 24,
  l: 32,
  xl: 40,

  btnSmall: 42,
  btnMedium: 60,
  btnLarge: 72,
};

export const FONTS = {
  extraBold: 'InterBlack',
  bold: 'InterBold',
  semiBold: 'InterSemiBold',
  medium: 'InterMedium',
  regular: 'InterRegular',
  light: 'InterLight',
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  text: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  blur: {
    // for background blur
  },
  box: {
    shadowColor: COLORS.black,
    textShadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.37,
    textShadowRadius: 32,
    elevation: 32,
  },
};
