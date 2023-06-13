import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
//Assets
import { useFonts } from 'expo-font';

//Screens
import { Home } from './screens/Home';
import { DrinkPage } from './screens/DrinkPage';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import SearchScreen from './screens/SearchScreen';
import { AddNewDrink } from './screens/AddNewDrink';

//Store / Storage
import { StoreProvider, useStoreActions, useStoreState } from 'easy-peasy';
import { store } from './store/store.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDrinksData from './transactions/getDrinksData';
import getIngredientsData from './transactions/getIngredientsData';
import { getUsersData } from './transactions/getUsersData';

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
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='SearchScreen' component={SearchScreen} />
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
    const storageLikes = await AsyncStorage.getItem('@likes_key');

    action.users.setCurrentUser({
      token: storageToken,
      email: storageEmail,
      id: storageId,
      likes: JSON.parse(storageLikes),
    });
  };

  const intialScreen =
    state.users.currentUser.token !== null ? 'Home' : 'Login';

  return (
    <Stack.Navigator initialRouteName={intialScreen}>
      <Stack.Screen
        name='Root'
        component={Root}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='DrinkPage' component={DrinkPage} />
      <Stack.Screen name='Settings' component={Settings} />
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
