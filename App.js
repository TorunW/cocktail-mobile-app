import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
//Assets
import { useFonts } from 'expo-font';
//Screens
import { Home } from './screens/Home';
import { DrinkPage } from './screens/DrinkPage';
import Login from './screens/Login';
import Profile from './screens/Profile';
import SearchScreen from './screens/SearchScreen';
import { AddNewDrink } from './screens/AddNewDrink';

//Store / Storage
import { StoreProvider, useStoreActions, useStoreState } from 'easy-peasy';
import { store } from './store/store.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDrinksData from './transactions/getDrinksData';
import getIngredientsData from './transactions/getIngredientsData';
import { getUsersData } from './transactions/getUsersData';
import { COLORS, SIZES } from './constants';
import {
  HomeIcon,
  HomeOutlineIcon,
  PlusIcon,
  PlusOutlineIcon,
  ProfileIcon,
  ProfileOutlineIcon,
  SearchIcon,
  SearchOutlineIcon,
} from './assets/icons/Icon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Root = () => {
  const currentUser = useStoreState((state) => state.users.currentUser.email);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconDisplay;

          if (route.name === 'Home') {
            iconDisplay = focused ? (
              <HomeIcon size={SIZES.icon} />
            ) : (
              <HomeOutlineIcon size={SIZES.icon} />
            );
          } else if (route.name === 'Profile') {
            iconDisplay = focused ? (
              <ProfileIcon size={SIZES.icon} />
            ) : (
              <ProfileOutlineIcon size={SIZES.icon} />
            );
          } else if (route.name === 'Advanced Search') {
            iconDisplay = focused ? (
              <SearchIcon size={SIZES.icon} />
            ) : (
              <SearchOutlineIcon size={SIZES.icon} />
            );
          } else if (route.name === 'AddDrink') {
            iconDisplay = focused ? (
              <PlusIcon size={SIZES.icon} />
            ) : (
              <PlusOutlineIcon size={SIZES.icon} />
            );
          }

          return iconDisplay;
        },
        tabBarActiveBackgroundColor: COLORS.pink,
        tabBarInactiveBackgroundColor: COLORS.pink,
        tabBarActiveTintColor: COLORS.black2,
        tabBarInactiveTintColor: COLORS.black2transparent,
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Advanced Search' component={SearchScreen} />
      <Tab.Screen name='AddDrink' component={AddNewDrink} />
    </Tab.Navigator>
  );
};

const StackScreens = () => {
  const state = useStoreState((state) => state);
  const action = useStoreActions((actions) => actions);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const [drinksData, ingredientsData, usersData] = await Promise.all([
      await getDrinksData(),
      await getIngredientsData(),
      await getUsersData(),
    ]);

    action.drinks.setDrinkList(drinksData);
    action.drinks.setIngredients(ingredientsData);
    action.users.setUserList(usersData);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const storageToken = await AsyncStorage.getItem('@token_key');
    const storageEmail = await AsyncStorage.getItem('@email_key');
    const storageId = await AsyncStorage.getItem('@id_key');
    const storageSavedRecipe = await AsyncStorage.getItem('@savedRecipe_key');
    const storageRatedDrinks = await AsyncStorage.getItem('@ratedDrinks_key');

    action.users.setCurrentUser({
      token: storageToken,
      email: storageEmail,
      id: storageId,
      savedRecipe: JSON.parse(storageSavedRecipe),
      ratedDrinks: JSON.parse(storageRatedDrinks),
    });
  };

  const intialScreen =
    state.users.currentUser.token !== null ? 'Home' : 'Login';

  return (
    <Stack.Navigator
      initialRouteName={intialScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='Root'
        component={Root}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='DrinkPage' component={DrinkPage} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [loaded] = useFonts({
    InterRegular: require('./assets/fonts/Outfit-Regular.ttf'),
    InterSemiBold: require('./assets/fonts/Outfit-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Outfit-Medium.ttf'),
    InterBold: require('./assets/fonts/Outfit-Bold.ttf'),
    InterLight: require('./assets/fonts/Outfit-Light.ttf'),
    InterBlack: require('./assets/fonts/Outfit-ExtraBold.ttf'),
  });

  if (!loaded) return null;

  return (
    <StoreProvider store={store}>
      <NavigationContainer theme={theme}>
        <StackScreens />
      </NavigationContainer>
    </StoreProvider>
  );
}
