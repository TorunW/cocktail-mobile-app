import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS, assets } from '../constants';
import Menu from '../assets/icons/menu.svg';
import { LinearGradient } from 'expo-linear-gradient';

export const Heart = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
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
      <Menu fill={COLORS.black} style={{ height: 40, width: 40 }} />
    </TouchableOpacity>
  );
};

export const ReadMoreBtn = ({ minWidth, fontSize, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        ...props,
      }}
      onPress={handlePress}
    >
      <LinearGradient
        colors={[COLORS.grad3, COLORS.grad2, COLORS.grad1]}
        style={{
          backgroundColor: COLORS.primary,
          padding: SPACING.s,
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
