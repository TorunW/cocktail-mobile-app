export const COLORS = {
  primary: '#EFA4AF',
  secondary: '#A4EFE4',

  white: '#FFF',
  gray: '#74858C',

  //Color
  cinnabar: '#ED5643',
  apricot: '#F6BFAA',
  cherryBlossomPink: '#EFA4AF',
  sandyBrown: '#FDB17D',
  //white
  snow: '#F9F4F0',
  //complimentary
  compCinnabar: '#32D6EC',
  compApricot: '#ACE1F6',
  compCherryBlossomPink: '#A4EFE4',
  compSandyBrown: '#7CCAFD',
  //black
  compSnow: '#0F0805',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const FONTS = {
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
};
