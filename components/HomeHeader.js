import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SHADOWS, SIZES, assets } from '../constants';
import { useStoreState } from 'easy-peasy';
import divider from '../assets/images/divider.png';

const HomeHeader = () => {
  return (
    <View>
      <ImageBackground
        source={divider}
        resizeMode='cover'
        style={{
          flex: 1,
          padding: SIZES.font,
          paddingTop: 64,
          height: 310,
        }}
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
            <Image
              resizeMode='cover'
              style={{ width: 50, height: 70, position: 'absolute', right: 10 }}
              source={require('../assets/images/martini.png')}
            />
          </View>
        </>
      </ImageBackground>
    </View>
  );
};

export default HomeHeader;
