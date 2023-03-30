import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import addComplexityScoreToDrinks from '../helpers/addComplexityScore';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigationState } from '@react-navigation/native';

export const Home = ({ navigation, props }) => {
  const navState = useNavigationState((state) => state);
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const cocktailList = state.cocktails.cocktailList;
  const term = state.cocktails.term;

  useEffect(() => {
    getCocktailList();
  }, [term]);

  function getCocktailList() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        const list = data.drinks;
        action.cocktails.setCocktailList(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            data={cocktailList}
            renderItem={({ item }) => <DrinkCard data={item} />}
            keyExtractor={(item) => item.idDrink}
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
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};
