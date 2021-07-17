import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';

import { UserSessionContext } from './Context.js'
//Stacks
import TabBarStack from './Stacks/TabBarStack';
import LogOutStack from './Stacks/LogOutStack';

const Stack = createStackNavigator();

export default function Router() {

  const { isLogged } = useContext(UserSessionContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogOutStack" screenOptions={{ headerShown: false }}>
            {isLogged ? (
              <Stack.Screen name="TabBarStack" component={TabBarStack} />
            ) : (
              <Stack.Screen name="LogOutStack" component={LogOutStack} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
