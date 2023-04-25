import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

//Assets
import { useFonts } from 'expo-font';
import { COLORS, SHADOWS } from './constants';

//Screens
import { Home } from './screens/Home';
import { DrinkPage } from './screens/DrinkPage';
import Menu from './components/Menu.js';

//Store
import { StoreProvider } from 'easy-peasy';
import { store } from './store/store.js';
import { AddRecipe } from './screens/AddRecipe';
import Login from './screens/Login';

const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
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
        <Drawer.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: '80%',
              backgroundColor: COLORS.transparent,
              ...SHADOWS.box,
              elevation: 1,
            },
            overlayColor: 'transparent',
          }}
          drawerContent={(props) => <Menu {...props} />}
        >
          <Drawer.Screen name='Home' component={Home} />
          <Drawer.Screen name='Login' component={Login} />
          <Drawer.Screen name='DrinkPage' component={DrinkPage} />
          <Drawer.Screen name='AddRecipe' component={AddRecipe} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
