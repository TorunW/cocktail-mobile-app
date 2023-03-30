import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { FONTS, SIZES } from '../constants';
import Search from './Search';
import { useStoreActions } from 'easy-peasy';

const Menu = ({ navigation }) => {
  const action = useStoreActions((actions) => actions);

  const handleClose = () => {
    navigation.toggleDrawer();
    action.menu.closeMenu;
  };

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

      <TouchableOpacity
        style={{ width: '100%', alignItems: 'center', margin: 20 }}
        onPress={handleClose}
      >
        <Text>CLOSE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
