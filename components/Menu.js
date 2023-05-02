import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
import Search from './Search';
import { useStoreActions } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';

const Menu = (props) => {
  const action = useStoreActions((actions) => actions);
  const navigation = useNavigation();

  /*  const handleClose = () => {
    navigation.toggleDrawer();
    action.menu.closeMenu;
  }; */

  return (
    <View
      style={{
        height: '100%',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '80%' }}>
          <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>
            Username
          </Text>
          <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.small }}>
            user.name@gmail.com
          </Text>
        </View>
        <View style={{ width: '20%' }}>
          <Image
            source={require('../assets/icons/user.png')}
            borderRadius={10}
          />
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Search />
        <Button
          title='+ Add new recipe'
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            navigation.navigate('AddRecipe');
          }}
        />
      </View>
    </View>
  );
};

export default Menu;
