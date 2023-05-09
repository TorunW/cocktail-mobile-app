import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import SearchIcon from '../assets/icons/Search.svg';
import SortIcon from '../assets/icons/Sort.svg';
import ArrowRight from '../assets/icons/ArrowRight.svg';
import ArrowDown from '../assets/icons/ArrowDown.svg';

const Search = () => {
  const state = useStoreState((state) => state);
  const action = useStoreActions((actions) => actions);
  const drinkList = state.drinks.drinkList;

  const handleSearch = (searchValue) => {
    if (!searchValue.length) return action.drinks.searchTerm('');

    if (searchValue.length) {
      action.drinks.searchTerm(searchValue);
    }
  };

  return (
    <View style={{ marginTop: SIZES.font, width: '100%', rowGap: SIZES.base }}>
      <View
        style={{
          width: '100%',
          borderRadius: SIZES.font,
          backgroundColor: COLORS.grad3,
          flexDirection: 'row',
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.small,
        }}
      >
        <SearchIcon />
        <TextInput
          placeholder='Search for Drinks'
          style={{ flex: 1, fontFamily: FONTS.regular }}
          onChangeText={handleSearch}
        />
      </View>
      <View
        style={{
          width: '100%',
          borderRadius: SIZES.font,
          backgroundColor: COLORS.grad3,
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.small,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <SortIcon />
          <Text style={{ fontFamily: FONTS.regular, width: '80%' }}>
            Sort by:
          </Text>
          <ArrowRight />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
