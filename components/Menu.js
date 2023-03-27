import { View, Text, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
import Search from './Search';

const Menu = (props) => {
  return (
    <View
      style={{
        height: '100%',
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.font,
      }}
    >
      <View style={{ width: '70%' }}>
        <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>
          Username
        </Text>
        <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.small }}>
          user.name@gmail.com
        </Text>
      </View>
      <View style={{ width: '20%' }}>
        <Image source={require('../assets/icons/user.png')} borderRadius={10} />
      </View>

      <Search />
    </View>
  );
};

export default Menu;
