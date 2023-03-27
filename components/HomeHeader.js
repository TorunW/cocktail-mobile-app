import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SHADOWS, SIZES, assets } from '../constants';

const HomeHeader = ({ isOpen }) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View>
      <ImageBackground
        source={assets.headerImg}
        resizeMode='cover'
        style={{
          flex: 1,
          padding: SIZES.font,
          height: windowHeight,
          marginBottom: -250,
          paddingTop: 64,
        }}
        blurRadius={!isOpen ? 0 : 4}
      >
        <>
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
              </Text>
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
        </>
      </ImageBackground>
    </View>
  );
};

export default HomeHeader;
