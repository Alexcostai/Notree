import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';

//Stacks
import TabBarStack from './Stacks/TabBarStack';
import LogOutStack from './Stacks/LogOutStack';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Redux/User/UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function Router() {

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.login.isLogged);

  useEffect(async () => {
    const session = await AsyncStorage.getItem('user_session');
    if(session!==null){
      dispatch(loginUser(true));
    } else{
      // dispatch(loginUser(false));
      dispatch(loginUser(true));
    }
  }, [])

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
