import React, { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import Client from '../Client';
import globalStyles from '../GlobalStyles';

export default function RegisterInputs() {

  const INVALID_EMAIL = "El email es invalido";
  const INVALID_NAME = "El nombre no puede estar vacio ni tener menos de 3 caracteres";
  const INVALID_LAST_NAME = "El apellido no puede estar vacio ni tenes menos de 3 caracteres";
  const INVALID_DATA = "El email ya esta registrado.\n¿Ya tenes una cuenta?";
  const INVALID_PASSWORD = "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 simbolo";

  const [register, setRegister] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [invalidData, setInvalidData] = useState({
    type: "",
    status: false,
  });

  const handleChangeValue = (name, value) => {
    if (invalidData.status) {
      setInvalidData({ type: "", status: false });
    }
    setRegister({ ...register, [name]: value });
  }

  const handleShowPassword = state => {
    setShowPassword(state);
  }

  function validateData() {
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!register.name || register.name < 3) {
      setInvalidData({ type: INVALID_NAME, status: true });
      return false;
    } else if (!register.lastName || register.lastName < 3) {
      setInvalidData({ type: INVALID_LAST_NAME, status: true });
      return false;
    } else if (!regEmail.test(register.email)) {
      setInvalidData({ type: INVALID_EMAIL, status: true });
      return false;
    } else if (!regPassword.test(register.password)) {
      setInvalidData({ type: INVALID_PASSWORD, status: true });
      return false;
    }
    return true;
  }

  const createUser = async () => {
    if (validateData()) {
      try {
        const res = await Client.signup(register);
        AsyncStorage.setItem('user_session', res.data.token);
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
      <ScrollView>
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          <TextInput
            style={{ ...styles.inputStyle, width: "49%" }}
            mode="outlined"
            textContentType="name"
            placeholder="Nombre..."
            value={register.name}
            onChangeText={text => handleChangeValue("name", text)}
            theme={{ colors: { primary: globalStyles.PRIMARY_APP_COLOR } }}
          />
          <TextInput
            style={{ ...styles.inputStyle, width: "49%" }}
            mode="outlined"
            textContentType="name"
            placeholder="Apellido..."
            value={register.lastName}
            onChangeText={text => handleChangeValue("lastName", text)}
            theme={{ colors: { primary: globalStyles.PRIMARY_APP_COLOR } }}
          />
        </View>
        <TextInput
          style={styles.inputStyle}
          mode="outlined"
          textContentType="emailAddress"
          placeholder="Email..."
          value={register.email}
          onChangeText={text => handleChangeValue("email", text)}
          theme={{ colors: { primary: globalStyles.PRIMARY_APP_COLOR } }}
        />
        <View>
          <TextInput
            style={styles.inputStyle}
            mode="outlined"
            textContentType="password"
            placeholder="Contraseña..."
            value={register.password}
            secureTextEntry={!showPassword}
            onChangeText={text => handleChangeValue("password", text)}
            theme={{ colors: { primary: globalStyles.PRIMARY_APP_COLOR } }}
            maxLength={28}
          />
          {showPassword ?
            <Icon
              onPress={() => handleShowPassword(false)}
              name="ios-eye"
              size={25} color="black"
              style={{ position: "absolute", right: 20, zIndex: 5, top: 27 }}
            /> :
            <Icon
              onPress={() => handleShowPassword(true)}
              name="ios-eye-off"
              size={25} color="black"
              style={{ position: "absolute", right: 20, zIndex: 5, top: 27 }}
            />
          }
        </View>
        {showInvalidData()}
        <View style={{ alignItems: "center" }} >
          <TouchableOpacity style={styles.registerButton} onPress={createUser}>
            <Text style={{ fontSize: 20, color: "#fff" }}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
  },
  registerButton: {
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: globalStyles.PRIMARY_APP_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 100
  },
})