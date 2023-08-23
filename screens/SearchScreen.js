import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import React from 'react';
import IngredientSearch from '../components/IngredientSearch';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';
import bg from '../assets/images/bg_7.jpg';
import { COLORS, SPACING, SIZES, FONTS } from '../constants/index';
import StaticHeader from '../components/StaticHeader';

const SearchScreen = () => {
  const navigation = useNavigation();
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const filteredIngredients = useStoreState(
    (state) => state.search.filteredIngredients
  );
  const setFilteredIngredients = action.search.setFilteredIngredients;
  const setFilteredDrinks = action.search.setFilteredDrinks;
  const drinks = useStoreState((state) => state.drinks.drinkList);

  const onSearch = async () => {
    let drinksWithSearchedIngredientArr = [];
    const filteredIngredientsId = filteredIngredients.map((item) => item.id);
    drinks.forEach((drink) => {
      const ingredientInDrinkId = drink.ingredients.map(
        (ingredient) => ingredient.id
      );
      const drinksIncludingSearchedIngredient = ingredientInDrinkId.some(
        (item) => filteredIngredientsId.includes(item)
      );

      if (drinksIncludingSearchedIngredient === true)
        return drinksWithSearchedIngredientArr.push(drink);
      action.search.setFilteredDrinks(drinksWithSearchedIngredientArr);
    });

    if (state.search.filteredDrinks.length !== 0) {
      navigation.navigate('Home');
    }
  };

  console.log(filteredIngredients, 'shb');

  const onClear = () => {
    setFilteredDrinks([]);
    setFilteredIngredients([]);
  };
  return (
    <ImageBackground source={bg} style={styles.page}>
      <StaticHeader />
      <View style={styles.pageContainer}>
        <Text style={styles.text}>
          Explore recipes based on the ingredients you have at home or your
          current cravings. The search results will display recipes that feature
          one or more matches.
        </Text>
        <IngredientSearch />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => onSearch()}>
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => onClear()}>
            <Text style={styles.buttonText}>Clear filters</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
  },
  pageContainer: {
    height: '60%',
    marginHorizontal: SPACING.m,
    marginVertical: SPACING.l + SPACING.xl,
    borderRadius: 30,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    marginBottom: SPACING.l,
  },
  button: {
    backgroundColor: COLORS.pinkTransparent,
    borderRadius: 30,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.s,
    justifyContent: 'center',
    padding: SPACING.m,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.s,
    justifyContent: 'center',
  },
});

export default SearchScreen;
