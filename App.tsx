import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Room1 from './pages/Room1';


const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Room1" component={Room1} />
    {/* <Stack.Screen name="Room2" component={Room2} /> */}
  </Stack.Navigator>
</NavigationContainer>
  );
}

export default App;
