import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../constants';
import SearchIcon from '../assets/icons/Search.svg';
import SortIcon from '../assets/icons/Sort.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowRight from '../assets/icons/ArrowRight.svg';

const Search = () => {
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
          placeholder='Search Cocktails'
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
