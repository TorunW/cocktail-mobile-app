import React, { useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigationState } from '@react-navigation/native';
import getDrinksData from '../transactions/getDrinksData';
import getIngredientsData from '../transactions/getIngredientsData';

export const Home = ({ navigation }) => {
  const navState = useNavigationState((state) => state);
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const drinksData = state.drinks.drinkList;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    action.drinks.setDrinkList(await getDrinksData());
    action.drinks.setIngredients(await getIngredientsData());
  };

  const handlePress = () => {
    navigation.toggleDrawer();
    action.menu.openMenu();
  };

  useEffect(() => {
    if (navState.history.find((item, index) => item.status === 'open')) {
      action.menu.openMenu();
    } else {
      action.menu.closeMenu();
    }
  }, [navState]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <StaticHeader handlePress={handlePress} />

        <View style={{ zIndex: 0 }}>
          <FlatList
            data={drinksData}
            renderItem={({ item }) => <DrinkCard data={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<HomeHeader />}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.grad3 }} />
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};
