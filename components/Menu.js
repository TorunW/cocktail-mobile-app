import { View, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';

const Menu = (props) => {
  return (
    <View
      style={{
        height: '100%',
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.font,
      }}
    >
      <View>
        <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>
          Username
        </Text>
        <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.small }}>
          user.name@gmail.com
        </Text>
      </View>
      <View>
        <Image source={require('../assets/icons/user.png')} borderRadius={10} />
      </View>
    </View>
  );
};

export default Menu;
