import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SHADOWS, SIZES, SPACING, assets } from '../constants';
import { useStoreState } from 'easy-peasy';
import NameSearch from './NameSearch';
import Sort from './Sort';

const HomeHeader = () => {
  const currentUserEmail = useStoreState(
    (state) => state.users.currentUser.email
  );
  return (
    <View
      style={{
        flex: 1,
        marginBottom: SPACING.l,
        height: 320,
      }}
    >
      <View
        style={{
          paddingHorizontal: SPACING.l,
          paddingTop: SPACING.xl + SPACING.m,
          paddingBottom: SPACING.l,
          gap: SPACING.l,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          elevation: 2,
          height: 320,
          backgroundColor: COLORS.deepPinkTransparent,
        }}
      >
        <View style={{ marginVertical: 0 }}>
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONTS.bold,
              color: COLORS.white,
              textTransform: 'uppercase',
              ...SHADOWS.text,
              width: '100%',
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONTS.bold,
              color: COLORS.white,
              textTransform: 'uppercase',
              ...SHADOWS.text,
              width: '100%',
              color: COLORS.white,
            }}
          >
            {currentUserEmail}
          </Text>
          <Text
            style={{
              fontSize: SIZES.extraLarge,
              fontFamily: FONTS.extraBold,
              color: COLORS.secondary,
              textTransform: 'uppercase',
              ...SHADOWS.text,
              marginTop: SIZES.base / 2,
            }}
          >
            Let's make cocktails
          </Text>
        </View>
        <View>
          <Sort />
          <NameSearch />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
