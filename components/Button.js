import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS, assets } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import MenuIcon from '../assets/icons/Menu.svg';
import Close from '../assets/icons/Cross.svg';
import { useStoreState } from 'easy-peasy';

export const LikeBtn = ({ imgUrl, handlePress, drinkId, color, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        position: 'absolute',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...props,
      }}
      onPress={handlePress}
    >
      {/*       <Image source={assets.heartFilled} style={{ height: 40, width: 40 }} />
       */}
      <Text
        style={{
          color: color,
          fontSize: 30,
          fontFamily: FONTS.extraBold,
          ...SHADOWS.text,
        }}
      >
        ♡
      </Text>
    </TouchableOpacity>
  );
};

export const ReadMoreBtn = ({ minWidth, fontSize, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        minWidth: minWidth,
        ...props,
      }}
      onPress={handlePress}
    >
      <LinearGradient
        colors={[COLORS.grad3, COLORS.grad2, COLORS.grad1]}
        style={{
          padding: SIZES.small,
          borderRadius: SIZES.extraLarge,
          minWidth: minWidth,
          ...props,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: fontSize,
            color: COLORS.black,
            textAlign: 'center',
          }}
        >
          Read more...
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const BackBtn = ({ handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        position: 'absolute',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.text,
        elevation: 10,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text style={{ color: COLORS.white }}>Back</Text>
    </TouchableOpacity>
  );
};

export const MenuBtn = ({ handlePress }) => {
  const isOpen = useStoreState((state) => state.menu.isOpen);

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={handlePress}
    >
      <MenuIcon fill={!isOpen ? COLORS.white : 'none'} />
    </TouchableOpacity>
  );
};
