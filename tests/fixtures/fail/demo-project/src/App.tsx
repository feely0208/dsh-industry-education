import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/home';
import AboutScreen from './pages/about';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '家校通' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: '关于' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
