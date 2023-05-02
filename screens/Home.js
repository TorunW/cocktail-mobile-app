import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { COLORS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigationState } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const Home = ({ navigation }) => {
  const navState = useNavigationState((state) => state);
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const cocktailsData = state.cocktails.cocktailList;

  useEffect(() => {
    getDrinks();
  }, []);

  const getDrinks = async () => {
    const querySnapshot = await getDocs(collection(db, 'cocktails'));
    const ingSnapshort = await getDocs(collection(db, 'ingredients'));
    const ingredients = ingSnapshort.docs.map((doc, index) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    action.cocktails.setIngredients(ingredients);
    const drinks = querySnapshot.docs.map((doc, index) => {
      return {
        id: doc.id,
        title: doc.data().title,
        image: doc.data().image,
        instructions: doc.data().instructions,
        alcoholic: doc.data().alcoholic,
        creator: doc.data().creator,
        complexity: doc.data().complexity,
        ingr: doc.data().ingr,
      };
    });

    action.cocktails.setCocktailList(drinks);
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
            data={cocktailsData}
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
