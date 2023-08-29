import { Image, ImageBackground, Text, View } from 'react-native';
import React from 'react';
import { useStoreState } from 'easy-peasy';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import background from '../assets/images/loginBackground.jpg';
import icon from '../assets/icons/icon.png';
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from '../constants';

const Login = () => {
  const state = useStoreState((state) => state);

  return (
    <ImageBackground
      source={background}
      resizeMode='cover'
      style={{
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          height: '100%',
          backgroundColor: COLORS.darkTransparent,
        }}
      >
        <View
          style={{
            height: '45%',
            paddingHorizontal: SPACING.l,
            paddingTop: SPACING.xl,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLORS.transparent,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.extraBold,
              fontSize: SIZES.extraLarge,
              textTransform: 'uppercase',
              color: COLORS.white,
              ...SHADOWS.text,
              textAlign: 'center',
            }}
          >
            Lemon Squeezy
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Image
              source={icon}
              style={{
                height: 70,
                width: 60,
                alignItems: 'center',
                marginBottom: SPACING.s,
              }}
              resizeMethod='auto'
            />
            <Text
              style={{
                justifyContent: 'flex-end',
                fontFamily: FONTS.medium,
                fontSize: SIZES.large,
                textTransform: 'capitalize',
                color: COLORS.white,
                ...SHADOWS.text,
                marginBottom: SPACING.xs,
                textShadowOffset: { width: 1, height: 1 },
              }}
            >
              Find and save cocktail recipies, ingredient search and more
            </Text>
          </View>
        </View>
        {state.users.toggleForm === 'login' ? <LoginForm /> : <RegisterForm />}
      </View>
    </ImageBackground>
  );
};

export default Login;
