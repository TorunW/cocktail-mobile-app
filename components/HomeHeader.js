import { View } from 'react-native';
import React from 'react';
import { COLORS, SPACING } from '../constants';
import { useStoreState } from 'easy-peasy';
import NameSearch from './NameSearch';
import Sort from './Sort';

const HomeHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: SPACING.xs,
        zIndex: 11,
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
          height: 200,
          backgroundColor: COLORS.deepPinkTransparent,
        }}
      >
        <View>
          <Sort />
          <NameSearch />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
