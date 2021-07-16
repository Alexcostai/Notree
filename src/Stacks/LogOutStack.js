import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';

const Stack = createStackNavigator();

export default function LogOutStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
