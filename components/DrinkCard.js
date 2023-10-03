import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, SHADOWS, SPACING, FONTS } from '../constants';
import {
  Title,
  Complexity,
  AverageRating,
  Description,
  Alcoholic,
  Creator,
} from './SubInfo';
import { handlePressSavedRecipe } from '../helpers/handlePressSavedRecipe';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { HeartIcon, HeartOutlineIcon } from '../assets/icons/Icon';

const DrinkCard = ({ data }) => {
  const navigation = useNavigation();
  const state = useStoreState((state) => state);
  const currentUser = state.users.currentUser;
  const action = useStoreActions((actions) => actions);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.savedRecipe !== null) {
      getSavedRecipe();
    }
  }, [currentUser]);

  const itemData = {
    drinkId: data.id,
    drinkName: data.title,
    userId: currentUser.id,
    savedRecipeArr: currentUser.savedRecipe,
  };

  const getSavedRecipe = () => {
    const filteredDrinkId = currentUser.savedRecipe?.find(
      (item) => item.id === data.id
    );

    filteredDrinkId && filteredDrinkId.id === data.id
      ? setIsSaved(true)
      : setIsSaved(false);
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('DrinkPage', { data })}
    >
      <Image
        source={{ uri: data.image }}
        resizeMode='cover'
        style={styles.image}
      />
      <Pressable
        onPress={() => handlePressSavedRecipe(itemData, action)}
        style={styles.likeButton}
      >
        {isSaved === true ? (
          <HeartIcon
            style={{
              ...SHADOWS.text,
            }}
            size={SIZES.icon}
            color={COLORS.red}
          />
        ) : (
          <HeartOutlineIcon
            style={{
              ...SHADOWS.text,
              fontWeight: 'bold',
            }}
            size={SIZES.icon}
            color={COLORS.red}
            handlePress={() => handlePressSavedRecipe(itemData, action)}
          />
        )}
      </Pressable>
      <View style={styles.infoContainer}>
        <Title title={data.title} style={styles.title} />
        <Creator creator={data.creator} style={styles.creator} />
        <Description
          description={
            data.description !== undefined
              ? data.description.slice(0, 150)
              : undefined
          }
          style={styles.description}
        />
        <View style={styles.smallTextContainer}>
          <Alcoholic
            alcoholic={data.alcoholic}
            textStyle={styles.smallText}
            size={SIZES.icon}
          />
          <AverageRating
            totalPoints={data.totalPoints}
            totalVoters={data.totalVoters}
            textStyle={styles.smallText}
          />
          <Complexity
            complexity={data.complexity}
            textStyle={styles.smallText}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: SPACING.xs,
    marginBottom: SPACING.xl,
    marginHorizontal: SPACING.s,
    borderRadius: 30,
    backgroundColor: COLORS.pinkTransparent,
    zIndex: 0,
  },
  image: {
    height: 200,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  likeButton: { position: 'absolute', top: SPACING.s, right: SPACING.s },
  infoContainer: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.xs,
    gap: SPACING.xs,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    ...SHADOWS.text,
    color: COLORS.black2,
    textTransform: 'capitalize',
  },
  creator: { fontFamily: FONTS.bold, fontSize: SIZES.base },
  description: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.black2,
  },
  smallTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: SPACING.s,
  },
  smallText: {
    color: COLORS.black2,
    fontFamily: FONTS.bold,
    fontSize: SIZES.base,
  },
});

export default DrinkCard;
