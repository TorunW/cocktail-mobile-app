import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants';
import { ImageCard, HomeHeader, FocusedStatusBar } from '../components';
import addComplexityScoreToDrinks from '../helpers/addComplexityScore';

export const Home = () => {
  const [cocktailList, setCocktailList] = useState([]);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={cocktailList}
            renderItem={({ item }) => <ImageCard data={item} />}
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
          <View
            style={{
              height: 300,
              backgroundColor: COLORS.snow,
            }}
          />
          <View style={{ flex: 1, backgroundColor: COLORS.snow }} />
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50 / 2,
  },
  userName: {
    marginLeft: 10,
    marginTop: 15,
  },
  feedImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
