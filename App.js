import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Home } from './screens/Home';
import { DrinkPage } from './screens/DrinkPage';
import Menu from './components/Menu.js';
import { COLORS, SHADOWS } from './constants';
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
        <Drawer.Screen name='DrinkPage' component={DrinkPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
