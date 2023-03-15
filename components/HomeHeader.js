import { View, Text, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants';

const HomeHeader = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 500,
      }}
    >
      <Image
        style={{
          width: '100%',
          height: 650,
        }}
        source={require('../assets/images/headerimg.jpg')}
      />

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: 16,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image source={require('../assets/icons/menu.png')} />
          <Text
            style={{
              position: 'absolute',
              width: '100%',
              fontSize: SIZES.large,
              fontWeight: 900,
              color: COLORS.snow,
              textTransform: 'uppercase',
              ...SHADOWS.text,
              textAlign: 'center',
            }}
          >
            LEMON SQUEEZY
          </Text>
        </View>

        <Text
          style={{
            top: 72,
            fontSize: SIZES.extraLarge,
            fontWeight: 900,
            color: COLORS.snow,
            textTransform: 'uppercase',
            ...SHADOWS.text,
          }}
        >
          Hello <Text style={{ color: COLORS.compApricot }}>Torun</Text>
          {'\n'}Let's make cocktails{' '}
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;
