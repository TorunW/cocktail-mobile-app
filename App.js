import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Home } from './screens/Home';
import { User } from './screens/User';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initalRouteName='Home'
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='User' component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
