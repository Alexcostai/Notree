import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { TextInput, HelperText } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function EPInput(props) {

    const [login, setLogin] = useState({
        email:"",
        password:""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [invalidData, setInvalidData] = useState(false);

    function handleChangeValue(name, value) {
        if (invalidData) {
            setInvalidData(false);
        }
        setLogin({...login, [name]: value});
    }

    function handleShowPassword(state) {
        setShowPassword(state);
    }

    function validateData() {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(login.email)) {
            setInvalidData(true);
            return false;
        }
        return true;
    }

    async function onPress() {
        if (validateData()) {
            props.onPress(login);
        }
    }

    return (
        <>
            <TextInput
                style={styles.inputStyle}
                mode="outlined"
                label="Email"
                textContentType="emailAddress"
                placeholder="Ingrese su email"
                value={login.email}
                onChangeText={text => handleChangeValue("email", text)}
                theme={{ colors: { primary: "#5e4223" } }}
            />
            <TextInput
                style={styles.inputStyle}
                mode="outlined"
                label="Contraseña"
                textContentType="password"
                placeholder="Ingrese su contraseña"
                value={login.password}
                secureTextEntry={!showPassword}
                onChangeText={text => handleChangeValue("password", text)}
                theme={{ colors: { primary: "#5e4223" } }}
                maxLength={28}
            />
            {invalidData ?
                <HelperText type="error" visible={invalidData} style={{fontSize:15, textAlign:"center"}}>
                    Usuario y/o contraseña invalidos
                </HelperText>
                : false
            }
            {showPassword ? (
                <Icon
                    onPress={() => handleShowPassword(false)}
                    name="ios-eye"
                    size={25} color="black"
                    style={{ position: "absolute", right: 35, zIndex: 5, top:145 }}
                />
            ) : (
                <Icon
                    onPress={() => handleShowPassword(true)}
                    name="ios-eye-off"
                    size={25} color="black"
                    style={{ position: "absolute", right: 35, zIndex: 5, top:145 }}
                />
            )}
            <View style={{ alignItems: "center" }} >
                <TouchableOpacity style={styles.loginButton} onPress={() => onPress() }>
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
    loginButton: {
        marginTop: 5,
        borderRadius: 100,
        backgroundColor: "#5e4223",
        paddingVertical: 8,
        paddingHorizontal: 100
    },
})