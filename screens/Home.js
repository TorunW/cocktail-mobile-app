import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants';
import {
  DrinkCard,
  HomeHeader,
  FocusedStatusBar,
  StaticHeader,
} from '../components';
import addComplexityScoreToDrinks from '../helpers/addComplexityScore';

export const Home = ({ navigation }) => {
  const [cocktailList, setCocktailList] = useState([]);
  const [searchResult, setSearch] = useState(cocktailList);

  useEffect(() => {
    getCocktailList();
  }, []);

  function getCocktailList() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        setCocktailList(addComplexityScoreToDrinks(data.drinks));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearch = (value) => {
    if (!value.length) return setSearch(cocktailList);

    const filteredData = cocktailList.filter((item) =>
      item.strDrink.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length) {
      setSearch(filteredData);
    } else {
      setSearch(cocktailList);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <StaticHeader handlePress={() => navigation.toggleDrawer()} />
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={searchResult.length === 0 ? cocktailList : searchResult}
            renderItem={({ item }) => <DrinkCard data={item} />}
            keyExtractor={(item) => item.idDrink}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
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
