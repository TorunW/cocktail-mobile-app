import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import bg from '../assets/images/bg_15.jpg';
import ProfileHeader from '../components/ProfileHeader';
import { DrinkCard } from '../components';
import { useStoreState } from 'easy-peasy';
import { SPACING } from '../constants';
import SettingsMenu from '../components/SettingsMenu';

const Profile = () => {
  const state = useStoreState((state) => state);
  const drinks = state.drinks.drinkList;
  const currentUser = state.users.currentUser;
  const drinkData = drinks.filter((drink) =>
    currentUser?.savedRecipe?.some((savedDrink) => drink.id === savedDrink.id)
  );

  return (
    <View>
      <SettingsMenu />
      <ImageBackground
        source={bg}
        resizeMode='cover'
        style={styles.profilePage}
      >
        <FlatList
          data={drinkData}
          renderItem={({ item }) => <DrinkCard data={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<ProfileHeader />}
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
});
export default Profile;
