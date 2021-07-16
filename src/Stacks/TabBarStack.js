import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import NoteScreen from '../Screens/NoteScreen';
import NoteListScreen from '../Screens/NoteListScreen';

const Stack = createStackNavigator();

export default function TabBarStack() {
  return (
    <Stack.Navigator initialRouteName="NoteList">
      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NoteListScreen"
        component={NoteListScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
