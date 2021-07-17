import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';

import globalStyles from '../GlobalStyles';
import LoginInputs from '../Components/LoginInputs';

import icon from '../../assets/adaptive-icon.png';
import background from '../../assets/loginBackground.png';

export default function LoginScreen() {

    const navigation = useNavigation();

    return (
        <View style={styles.centeredView}>
            <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}></ImageBackground>
            <View style={{ marginTop: 50, alignItems: "center" }}>
                <Image source={icon} style={{ width: 100, height: 100 }} />
                <Text style={styles.title}>Notree App</Text>
            </View>
            <View style={styles.loginView}>
                <Text style={{ fontSize: 18 }}>Bienvenido!</Text>
                <LoginInputs />
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Text style={{ marginRight: 10, color: "#000", fontSize: 15 }}>¿Todavia no estas registrado?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }}>
                        <Text style={styles.registerButton}>Registrarse</Text>
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
    loginView: {
        width: 350,
        marginTop: 50,
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
    registerButton: {
        color: globalStyles.PRIMARY_APP_COLOR,
        fontSize: 15,
        textDecorationLine: "underline"
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        fontSize: 20,
        color: globalStyles.PRIMARY_APP_COLOR,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,

    }
})