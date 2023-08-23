import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { action, useStoreActions, useStoreState } from 'easy-peasy';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';
import { Close } from '../assets/icons/Icon';

const IngredientSearch = () => {
  const ingredients = useStoreState((state) => state.drinks.ingredients);
  const filteredIngredients = useStoreState(
    (state) => state.search.filteredIngredients
  );
  const setFilteredIngredients = useStoreActions(
    (actions) => actions.search.setFilteredIngredients
  );
  const [input, setInput] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const onChangeText = async (text) => {
    setInput(text);
    const res = ingredients
      .filter((ingredient) =>
        ingredient.name.toLowerCase().includes(text.toLowerCase())
      )
      .map((ingredientObj) => ({
        id: ingredientObj.id,
        name: ingredientObj.name,
      }));

    text.length === 0 ? setSearchResult([]) : setSearchResult(res);
  };

  const addToFilteredingredients = (item) => {
    const isIngredientAdded = filteredIngredients.some(
      (obj) => obj.name === item.name
    );

    if (isIngredientAdded === false) {
      const arr = filteredIngredients;
      arr.push(item);
      setFilteredIngredients(arr);
      setInput('');
      setSearchResult([]);
    }
  };

  const removeFromFilteredingredients = (item) => {
    const newFilteredIngredientArr = filteredIngredients.filter(
      (obj) => obj.name !== item.name
    );
    setFilteredIngredients(newFilteredIngredientArr);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder='Search For Ingredients'
        value={input}
        onChangeText={onChangeText}
        style={
          searchResult.length > 0
            ? styles.searchInputActive
            : styles.searchInputinactive
        }
      />
      <FlatList
        style={styles.optionsContainer}
        data={searchResult}
        renderItem={({ item, index }) => {
          const isAdded = filteredIngredients.some(
            (obj) => obj.name === item.name
          );

          return (
            <Pressable
              onPress={() => addToFilteredingredients(item)}
              style={styles.optionsList}
            >
              <Text style={isAdded === false ? styles.text : styles.added}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.resultContainer}>
        <FlatList
          data={filteredIngredients}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.resultBox}
              onPress={() => removeFromFilteredingredients(item)}
            >
              <Text style={styles.resultText}>
                {item.name} <Close size={SIZES.medium} />
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: { marginBottom: SPACING.m },
  searchInputActive: {
    backgroundColor: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    height: 50,
    paddingHorizontal: 15,
    elevation: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  searchInputinactive: {
    backgroundColor: COLORS.lightTransparent,
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    height: 50,
    paddingHorizontal: 15,
    elevation: 1,
    borderRadius: 30,
  },
  optionsContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.s,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    width: '100%',
  },
  optionsList: { marginVertical: SPACING.s },
  text: {
    fontFamily: FONTS.medium,
    textTransform: 'capitalize',
  },
  added: {
    color: COLORS.black2transparent,
    fontFamily: FONTS.medium,
    textTransform: 'capitalize',
  },
  resultContainer: {
    marginVertical: SPACING.xs,
  },
  resultBox: {
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  resultText: {
    padding: SPACING.xs,
    backgroundColor: COLORS.darkTransparent,
    borderRadius: 50,
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.small,
    textTransform: 'capitalize',
  },
});

export default IngredientSearch;
