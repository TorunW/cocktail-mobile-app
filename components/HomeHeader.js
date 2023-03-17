import { View, Text, Image, TextInput, ImageBackground } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SHADOWS, SIZES, assets } from '../constants';
const HomeHeader = ({ onSearch }) => {
  return (
    <View>
      <ImageBackground
        source={assets.headerImg}
        resizeMode='cover'
        style={{
          flex: 1,
          padding: SIZES.font,
          height: 200,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: SIZES.font,
          }}
        >
          <Image source={assets.menu} resizeMode='contain' />
          <Text
            style={{
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
        <View style={{ marginVertical: SIZES.font }}>
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONTS.bold,
              color: COLORS.white,
              textTransform: 'uppercase',
              ...SHADOWS.text,
            }}
          >
            Hello
            <Text
              style={{
                color: COLORS.secondary,
              }}
            >
              Torun
            </Text>{' '}
          </Text>
          <Text
            style={{
              fontSize: SIZES.extraLarge,
              fontFamily: FONTS.extraBold,
              color: COLORS.white,
              textTransform: 'uppercase',
              ...SHADOWS.text,
              marginTop: SIZES.base / 2,
            }}
          >
            Let's make cocktails
          </Text>
        </View>
        <View style={{ marginTop: SIZES.font }}>
          <View
            style={{
              width: '100%',
              borderRadius: SIZES.font,
              backgroundColor: COLORS.grad3,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.small,
            }}
          >
            <TextInput
              placeholder='Search Cocktails'
              style={{ flex: 1, fontFamily: FONTS.regular }}
              onChangeText={onSearch}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeHeader;
