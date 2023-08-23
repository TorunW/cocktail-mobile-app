import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import AlertModal from './AlertModal';
import { CloseIcon, FilterIcon, SearchIcon } from '../assets/icons/Icon';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';
import Sort from './Sort';

const NameSearch = () => {
  const drinks = useStoreState((state) => state.drinks.drinkList);
  const filteredDrinks = useStoreState((state) => state.search.filteredDrinks);
  const setFilteredDrinks = useStoreActions(
    (actions) => actions.search.setFilteredDrinks
  );
  const [input, setInput] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChangeText = async (text) => {
    setInput(text);
    const res = drinks
      .filter((drink) => drink.title.toLowerCase().includes(text.toLowerCase()))
      .map((drinkObj) => drinkObj);

    text.length === 0 ? setSearchResult([]) : setSearchResult(res);
  };

  const onSearch = () => {
    if (searchResult.length === 0) {
      setIsModalVisible(true);
    } else {
      setFilteredDrinks(searchResult);
      setInput('');
      setSearchResult([]);
    }
  };

  const addToSearch = (item) => {
    setInput(item.title);
  };

  let searchButton;
  let clearButton;
  if (filteredDrinks.length === 0 || searchResult.length >= 1) {
    searchButton = (
      <TouchableOpacity
        onPress={() => onSearch()}
        style={{
          position: 'absolute',
          right: 15,
          top: 11,
        }}
      >
        <SearchIcon size={SIZES.icon} />
      </TouchableOpacity>
    );
  } else if (filteredDrinks.length >= 1 || searchResult.length === 0) {
    clearButton = (
      <TouchableOpacity
        onPress={() => onClear()}
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SPACING.s,
          backgroundColor: COLORS.lightTransparent,
          padding: SPACING.xs,
          borderRadius: 50,
        }}
      >
        <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.font }}>
          Clear filters
        </Text>
        <CloseIcon size={SIZES.large} />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        marginVertical: SPACING.xs,
        marginBottom: SPACING.m,
        position: 'relative',
      }}
    >
      {isModalVisible === true ? (
        <AlertModal
          message={`No drink with this name`}
          title={''}
          visible={isModalVisible}
          closeModal={() => setIsModalVisible(false)}
        />
      ) : (
        ''
      )}
      <View>
        <TextInput
          placeholder='Find drinks'
          style={{
            backgroundColor: input ? COLORS.white : COLORS.lightTransparent,
            fontFamily: FONTS.medium,
            fontSize: SIZES.large,
            height: 50,
            paddingHorizontal: 15,
            elevation: 1,
            borderBottomLeftRadius: searchResult.length > 0 ? 0 : 30,
            borderBottomRightRadius: searchResult.length > 0 ? 0 : 30,
            borderTopLeftRadius: searchResult.length > 0 ? 18 : 30,
            borderTopRightRadius: searchResult.length > 0 ? 18 : 30,
          }}
          value={input}
          onChangeText={onChangeText}
        />
        {searchButton}
      </View>

      <FlatList
        data={searchResult}
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: SPACING.s,
          borderBottomRightRadius: 18,
          borderBottomLeftRadius: 18,
          width: '100%',
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => addToSearch(item)}
            style={{
              marginVertical: SPACING.s,
            }}
          >
            <Text style={{ fontFamily: FONTS.medium }}> {item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NameSearch;
