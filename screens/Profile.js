import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import bg from '../assets/images/bg_15.jpg';
import ProfileHeader from '../components/ProfileHeader';
import { DrinkCard } from '../components';
import { useStoreState } from 'easy-peasy';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';
import SettingsMenu from '../components/SettingsMenu';
import { useState } from 'react';

const Profile = () => {
  const state = useStoreState((state) => state);
  const drinks = state.drinks.drinkList;
  const currentUser = state.users.currentUser;
  const [toggleFlatlist, setToggleFlatlist] = useState(false);

  const likedDrinksData = drinks.filter((drink) =>
    currentUser?.savedRecipe?.some((savedDrink) => drink.id === savedDrink.id)
  );

  const createdDrinksData = drinks.filter(
    (drink) => drink.creatorId === currentUser.id
  );

  return (
    <View>
      <SettingsMenu />
      <ImageBackground
        source={bg}
        resizeMode='cover'
        style={styles.profilePage}
      >
        <ProfileHeader />
        <View style={styles.toggleBar}>
          <Pressable
            style={
              toggleFlatlist === false
                ? styles.toggleButtonLeftActive
                : styles.toggleButtonLeft
            }
            onPress={() =>
              toggleFlatlist === true
                ? setToggleFlatlist(false)
                : setToggleFlatlist(true)
            }
          >
            <Text
              style={
                toggleFlatlist === false
                  ? styles.buttonTextActive
                  : styles.buttonText
              }
            >
              Likes
            </Text>
          </Pressable>
          <Pressable
            style={
              toggleFlatlist === true
                ? styles.toggleButtonRightActive
                : styles.toggleButtonRight
            }
            onPress={() =>
              toggleFlatlist === true
                ? setToggleFlatlist(false)
                : setToggleFlatlist(true)
            }
          >
            <Text
              style={
                toggleFlatlist === true
                  ? styles.buttonTextActive
                  : styles.buttonText
              }
            >
              Your recipes
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={toggleFlatlist === false ? likedDrinksData : createdDrinksData}
          renderItem={({ item }) => <DrinkCard data={item} />}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    height: Dimensions.get('window').height,
    paddingBottom: SPACING.l,
    width: '100%',
  },
  toggleBar: {
    marginHorizontal: SPACING.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
  },
  toggleButtonLeft: {
    alignItems: 'center',
    backgroundColor: COLORS.deepPinkTransparent,
    opacity: 0.7,
    width: '50%',
    padding: SPACING.xs,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  toggleButtonLeftActive: {
    alignItems: 'center',
    backgroundColor: COLORS.pinkTransparent,
    width: '50%',
    padding: SPACING.xs,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  toggleButtonRight: {
    alignItems: 'center',
    backgroundColor: COLORS.deepPinkTransparent,
    opacity: 0.7,
    width: '50%',
    padding: SPACING.xs,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  toggleButtonRightActive: {
    alignItems: 'center',
    backgroundColor: COLORS.pinkTransparent,
    width: '50%',
    padding: SPACING.xs,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
  },
  buttonTextActive: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
  },
});
export default Profile;
