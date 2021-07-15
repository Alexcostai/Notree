import React, { useState } from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

import background from '../../assets/loginBackground.png';

export default function RegisterScreen() {

    const navigation = useNavigation();
    const [register, setRegister] = useState({
        mail: null,
        password: null
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validatedRegister, setValidatedRegister] = useState(false);

    const handleChangeValue = (name, value) => {
        if(validatedRegister){
            setValidatedRegister(false);
        }
        setRegister({ ...register, [name]: value });
    }

    const handleShowPassword = state => {
        setShowPassword(state);
    }

    const validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(register.mail) === false) {
            console.log("Email is Not Correct");
            setValidatedRegister(true);
            return false;
        }
        else {
            console.log("Email is Correct");
            setValidatedRegister(false);
            return true;
        }
    }

    const createUser = async () => {
        const api_url = "https://peyo.com.ar/api/usuario/registrar";

        if (validateEmail()) {
            let user = {
                mail: register.mail.toLowerCase(),
                password: register.password
            }
            await axios.post(api_url, user).then((response) => {
                if (response.data === "") {
                    var errorMessage = response.headers.map["error-message"]
                    if (errorMessage !== undefined) {
                        Alert.alert("Error de registracion", errorMessage)
                    } else {
                        Alert.alert("Error de registracion", "No se pudo realizar la registracion en este momento");
                    }
                } else {
                    let stringId = response.data.id.toString();
                    AsyncStorage.setItem('user', stringId);
                    navigation.navigate('NoteList');
                }
            })
        } else {
            console.log("Email incorrecto");
        }
    }

    return (
        <View style={styles.centeredView}>
            <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}></ImageBackground>
            <View style={styles.registerView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Appbar.BackAction
                        onPress={() => navigation.push("Login")}
                        style={{ right: 15 }}
                    />
                    <Text style={{ fontSize: 18, right: 15 }}>Ingresa tus datos:</Text>
                </View>
                <TextInput
                    style={styles.inputStyle}
                    mode="outlined"
                    label="Email"
                    textContentType="emailAddress"
                    placeholder="Ingrese su email"
                    value={register.mail}
                    onChangeText={text => handleChangeValue("mail", text)}
                    theme={{ colors: { primary: "#5e4223" } }}
                />
                <TextInput
                    style={styles.inputStyle}
                    mode="outlined"
                    label="Contraseña"
                    textContentType="password"
                    placeholder="Ingrese su contraseña"
                    value={register.password}
                    secureTextEntry={!showPassword}
                    onChangeText={text => handleChangeValue("password", text)}
                    theme={{ colors: { primary: "#5e4223" } }}
                    maxLength={28}
                />
                {showPassword ?
                    <Icon
                        onPress={() => handleShowPassword(false)}
                        name="ios-eye"
                        size={25} color="black"
                        style={{ position: "absolute", right: 35, zIndex: 5, top: 170 }}
                    /> :
                    <Icon
                        onPress={() => handleShowPassword(true)}
                        name="ios-eye-off"
                        size={25} color="black"
                        style={{ position: "absolute", right: 35, zIndex: 5, top: 170 }}
                    />
                }
                <View style={{ alignItems: "center" }} >
                    <TouchableOpacity style={styles.registerButton} onPress={() => createUser}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: "50%",
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
    inputStyle: {
        marginVertical: 5,
    },
    registerButton: {
        marginTop: 20,
        borderRadius: 100,
        backgroundColor: "#5e4223",
        paddingVertical: 8,
        paddingHorizontal: 100
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})