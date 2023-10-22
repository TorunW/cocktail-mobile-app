import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from '../constants';
import React from 'react';

const StaticHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LEMON SQUEEZY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 10,
    width: '100%',
    padding: SPACING.s,
  },
  text: {
    fontFamily: FONTS.extraBold,
    fontSize: SIZES.large,
    color: COLORS.white,
    textTransform: 'uppercase',
    ...SHADOWS.text,
    textAlign: 'center',
  },
});
export default StaticHeader;
