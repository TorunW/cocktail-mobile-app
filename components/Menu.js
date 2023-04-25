import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
import Search from './Search';
import { useStoreActions } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Divider from '../assets/icons/divider.svg';

const Menu = (props) => {
  const action = useStoreActions((actions) => actions);
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.toggleDrawer();
    action.menu.closeMenu;
  };

  return (
    <View
      style={{
        height: '100%',
      }}
    >
      <LinearGradient
        colors={[COLORS.grad2, COLORS.grad3, COLORS.grad3, COLORS.grad2]}
        style={{ padding: 20, height: '15%' }}
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
      </LinearGradient>
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
