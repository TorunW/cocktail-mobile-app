import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from '../constants';
import { FocusedStatusBar } from '../components';
import {
  Alcoholic,
  AverageRating,
  Complexity,
  Description,
  Title,
} from '../components/SubInfo';
import RateDrink from '../components/RateDrink';
import { LinearGradient } from 'expo-linear-gradient';
import { GoBackIcon, HeartIcon, HeartOutlineIcon } from '../assets/icons/Icon';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { handlePressSavedRecipe } from '../helpers/handlePressSavedRecipe';

export const DrinkPage = ({ route, navigation }) => {
  const { data } = route.params;
  const state = useStoreState((state) => state);
  const action = useStoreActions((actions) => actions);
  const currentUser = state.users.currentUser;
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
    <ScrollView style={styles.page}>
      <FocusedStatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <View style={styles.staticBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <GoBackIcon
            style={{ ...SHADOWS.text }}
            color={COLORS.white}
            size={SIZES.iconL}
          />
        </Pressable>

        <Pressable
          onPress={() => handlePressSavedRecipe(itemData, action)}
          style={styles.likeButton}
        >
          {isSaved === true ? (
            <HeartIcon
              style={{ ...SHADOWS.text }}
              size={SIZES.iconL}
              color={COLORS.red}
            />
          ) : (
            <HeartOutlineIcon
              style={{ ...SHADOWS.text }}
              size={SIZES.iconL}
              color={COLORS.red}
              handlePress={() => handlePressSavedRecipe(itemData, action)}
            />
          )}
        </Pressable>
      </View>

      <View>
        <Image style={styles.image} source={{ uri: data.image }} />
        <LinearGradient
          colors={['transparent', 'transparent', COLORS.pink]}
          style={styles.gradient}
        />
      </View>

      <View style={styles.infoContainer}>
        <AverageRating
          totalPoints={data.totalPoints}
          starSize={SIZES.icon}
          textStyle={styles.smallText}
        />
        <Alcoholic
          alcoholic={data.alcoholic}
          size={SIZES.icon}
          textStyle={styles.smallText}
          color={COLORS.black2}
        />
        {/*    <Complexity
          complexity={data.complexity}
          textStyle={styles.smallText}
          size={SIZES.icon}
        /> */}
      </View>

      <View style={styles.drinkContent}>
        <Title title={data.title} style={styles.title} />
        <Description description={data.description} style={styles.midText} />
        <Text style={styles.subTitle}>Ingredients</Text>
        {data.ingredients !== undefined ? (
          data.ingredients.map((item, index) => (
            <View key={item.id} style={styles.ingredientRow}>
              <Text style={styles.midText}>{item.ingredient}</Text>
              <Text style={styles.midText}>{item.measure}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.smallText}>error</Text>
        )}
        <Text style={styles.subTitle}>Instructions</Text>
        <Text style={styles.midText}>{data.instructions}</Text>
        <RateDrink data={data} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.pink,
  },
  staticBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.s,
  },
  icon: { margin: SPACING.l },
  image: {
    width: '100%',
    height: 360,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: 360,
  },
  smallText: {
    fontSize: SIZES.base,
    fontFamily: FONTS.bold,
    color: COLORS.black2,
  },
  infoContainer: {
    backgroundColor: COLORS.midPink,
    borderRadius: 30,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.s,
    marginBottom: SPACING.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
    marginHorizontal: SPACING.xs,
  },
  drinkContent: {
    paddingHorizontal: SPACING.m,
  },
  title: {
    fontFamily: FONTS.extraBold,
    fontSize: SIZES.extraLarge,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  subTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: SPACING.xs,
    marginTop: SPACING.m,
  },
  midText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: SPACING.xl + SPACING.xl,
    marginBottom: SPACING.xs,
  },
});

export default DrinkPage;
