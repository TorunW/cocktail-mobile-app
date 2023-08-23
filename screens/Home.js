import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import { useStoreState } from 'easy-peasy';
import divider from '../assets/images/bg_4.jpg';

export const Home = () => {
  const state = useStoreState((state) => state);
  const alphabeticallyOrder = state.search.alphabeticallyOrder;
  const popularityOrder = state.search.popularityOrder;
  const drinksData =
    state.search.filteredDrinks.length >= 1
      ? state.search.filteredDrinks
      : state.drinks.drinkList;

  if (alphabeticallyOrder === 'ASC') {
    drinksData.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  } else if (alphabeticallyOrder === 'DESC') {
    drinksData.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  }

  if (popularityOrder === 'ASC') {
    drinksData.sort((a, b) => {
      return b.averageRating - a.averageRating;
    });
  } else if (popularityOrder === 'DESC') {
    drinksData.sort((a, b) => {
      return a.averageRating - b.averageRating;
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <StaticHeader />

        <View style={{ zIndex: 1 }}>
          <ImageBackground
            resizeMode='cover'
            source={divider}
            style={{
              height: Dimensions.get('window').height,
            }}
          >
            <FlatList
              data={drinksData}
              renderItem={({ item }) => <DrinkCard data={item} />}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={<HomeHeader />}
            />
          </ImageBackground>
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
