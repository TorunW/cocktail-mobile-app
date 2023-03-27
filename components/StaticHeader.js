import { View, Text, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants';
import React from 'react';
import { MenuBtn } from './Button';
import { useStoreState } from 'easy-peasy';

const StaticHeader = ({ handlePress }) => {
  const isOpen = useStoreState((state) => state.menu.isOpen);
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        zIndex: 10,
        width: '100%',
        padding: SIZES.font,
      }}
    >
      {!isOpen ? <MenuBtn handlePress={handlePress} /> : <Text> </Text>}
      <Text
        style={{
          left: windowWidth / 5,
          top: 10,
          fontFamily: FONTS.extraBold,
          fontSize: SIZES.large,
          color: COLORS.white,
          textTransform: 'uppercase',
          ...SHADOWS.text,
          textAlign: 'center',
        }}
      >
        LEMON SQUEEZY
      </Text>
    </View>
  );
};

export default StaticHeader;
