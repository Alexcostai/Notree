import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { TextInput, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import globalStyles from '../GlobalStyles';
import Client from '../Client';

export default function EPInput(props) {

  const INVALID_EMAIL = "El email es invalido";
  const INVALID_DATA = "El email y/o contraseña son invalidos";

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [invalidData, setInvalidData] = useState({
    type: "",
    status: false,
  });

  function handleChangeValue(name, value) {
    if (invalidData.status) {
      setInvalidData({ type: "", status: false });
    }
    setLogin({ ...login, [name]: value });
  }

  function handleShowPassword(state) {
    setShowPassword(state);
  }

  function validateData() {
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!reg.test(login.email)) {
      setInvalidData({ type: INVALID_EMAIL, status: true });
      return false;
    }
    return true;
  }

  async function onPress() {
    if (validateData()) {
      try {
        const res = await Client.signin(login)
        await AsyncStorage.setItem('user_session', res.data.token);
      } catch (error) {
        setInvalidData({ type: INVALID_DATA, status: true });
        console.log(error);
      }
    }
  }

  function showInvalidData() {
    if (invalidData.status) {
      return (
        <HelperText type="error" visible={invalidData.status} style={{ fontSize: 15, textAlign: "center" }}>
          {invalidData.type}
        </HelperText>
      )
    }
  }

  return (
    <>
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        textContentType="emailAddress"
        placeholder="Ingrese su email"
        value={login.email}
        onChangeText={text => handleChangeValue("email", text)}
        theme={{ colors: { primary: globalStyles.PRIMARY_APP_COLOR } }}
      />
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        textContentType="password"
        placeholder="Ingrese su contraseña"
        value={login.password}
        secureTextEntry={!showPassword}
        onChangeText={text => handleChangeValue("password", text)}
        theme={{ colors: { primary: globalStyles.PRIMARY_APP_COLOR } }}
        maxLength={28}
      />
      {showInvalidData()}
      {showPassword ? (
        <Icon
          onPress={() => handleShowPassword(false)}
          name="ios-eye"
          size={25} color="black"
          style={{ position: "absolute", right: 35, zIndex: 5, top: 145 }}
        />
      ) : (
        <Icon
          onPress={() => handleShowPassword(true)}
          name="ios-eye-off"
          size={25} color="black"
          style={{ position: "absolute", right: 35, zIndex: 5, top: 145 }}
        />
      )}
      <View style={{ alignItems: "center" }} >
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
          <Text style={{ fontSize: 20, color: "#fff" }} >Ingresar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
  },
  button: {
    marginTop: 5,
    borderRadius: 100,
    backgroundColor: globalStyles.PRIMARY_APP_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 100
  },
})