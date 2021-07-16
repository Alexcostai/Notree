import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native';

import RegisterInputs from '../Components/RegisterInputs';
import background from '../../assets/loginBackground.png';

export default function RegisterScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}></ImageBackground>
      <View style={styles.registerView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Appbar.BackAction
            onPress={() => navigation.navigate("LoginScreen")}
            style={{ right: 15 }}
          />
          <Text style={{ fontSize: 18, right: 15 }}>Ingresa tus datos:</Text>
        </View>
        <RegisterInputs />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
  registerView: {
    width: 350,
    marginTop: "40%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})