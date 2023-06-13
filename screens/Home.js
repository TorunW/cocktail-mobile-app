import React, { useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import { useStoreState } from 'easy-peasy';

export const Home = () => {
  const state = useStoreState((state) => state);
  const drinksData = state.drinks.drinkList;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <StaticHeader />

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
