import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { FilterIcon } from '../assets/icons/Icon';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';

const Sort = () => {
  const state = useStoreState((state) => state);
  const action = useStoreActions((actions) => actions);
  const [showOptions, setShowOptions] = useState(false);
  const alphabeticallyOrder = state.search.alphabeticallyOrder;
  const popularityOrder = state.search.popularityOrder;

  const handleSortAlphabetically = () => {
    if (alphabeticallyOrder === '' || alphabeticallyOrder === 'DESC') {
      action.search.setAlphabeticallyOrder('ASC');
    } else if (alphabeticallyOrder === 'ASC') {
      action.search.setAlphabeticallyOrder('DESC');
    }
    setShowOptions(false);
  };

  const handleSortByPopularity = () => {
    if (popularityOrder === '' || popularityOrder === 'DESC') {
      action.search.setPopularityOrder('ASC');
    } else if (popularityOrder === 'ASC') {
      action.search.setPopularityOrder('DESC');
    }
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={
          showOptions === true ? styles.fieldActive : styles.fieldNonactive
        }
        onPress={() => setShowOptions(showOptions === false ? true : false)}
      >
        <Text style={styles.placeholderText}>Sort by...</Text>
        <FilterIcon color={COLORS.black2} size={SIZES.icon} />
      </Pressable>
      {showOptions === true ? (
        <View style={styles.dropDown}>
          <Pressable onPress={() => handleSortAlphabetically()}>
            <Text style={styles.dropDownText}>Sort alphabetically</Text>
          </Pressable>
          <Pressable onPress={() => handleSortByPopularity()}>
            <Text style={styles.dropDownText}>Sort by popularity</Text>
          </Pressable>
        </View>
      ) : (
        ''
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { position: 'relative', marginBottom: SPACING.xs },
  fieldActive: {
    backgroundColor: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 20,
    height: 50,
    paddingHorizontal: 15,
    elevation: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldNonactive: {
    backgroundColor: COLORS.lightTransparent,
    fontFamily: FONTS.medium,
    fontSize: 20,
    height: 50,
    paddingHorizontal: 15,
    elevation: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    color: '#00000060',
  },
  dropDown: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.s,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    width: '100%',
  },
  dropDownText: { fontFamily: FONTS.medium, marginVertical: SPACING.s },
});

export default Sort;
