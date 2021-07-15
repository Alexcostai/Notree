import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Menu, { MenuItem } from 'react-native-material-menu';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, ActivityIndicator, Button, Divider } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

import Client from '../Client.js'
//Components
import Snack from "../Components/Snack";

export default function NoteListScreen() {

    const NEW_NOTE_ID = -1;
    const navigation = useNavigation();
    const route = useRoute();

    const [notes, setNotes] = useState([]);
    const [loadedNotes, setLoadedNotes] = useState(false)
    const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);

    useEffect(async () => {
        const res = await Client.getNotes();
        setNotes(res.data);
        setLoadedNotes(true);
    }, []);

    const ModalConfirm = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={modalVisibleConfirm}>
                <View style={styles.centeredView}>
                    <View style={styles.modalViewConfirm}>
                        <Text style={{ marginBottom: 5, fontSize: 18, textAlign: "center" }} >¿Estas seguro de cerrar sesión?</Text>
                        <Divider />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30 }}>
                            <Button
                                mode="contained"
                                onPress={() => { setModalVisibleConfirm(false); }}
                                color={"#695948"}
                            >
                                No
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => { setModalVisibleConfirm(false); console.log("Sesion Cerrada"); navigation.push("Login"); }}
                                color={"red"}
                            >
                                Si
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const ProfileMenu = () => {
        let _menu = null;
        const setMenuRef = ref => { _menu = ref };
        const hideMenu = () => { _menu.hide() };
        const showMenu = () => { _menu.show() };

        return (
            <Menu
                ref={setMenuRef}
                style={{ marginTop: 40, elevation: 20 }}
                button={<Appbar.Action icon="account-circle" color="white" size={35} onPress={() => showMenu()} />}
            >
                <MenuItem
                    textStyle={{ fontSize: 15 }}
                    onPress={() => { hideMenu(); setModalVisibleConfirm(true); }}
                >
                    <Text>Cerrar Sesión</Text>
                </MenuItem>
            </Menu>
        )
    }

    const AddButton = () => {
        return(
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate
                    (
                        "Note",
                        { 
                            id: NEW_NOTE_ID,
                            title: "",
                            description: "",
                            color: "white",
                        }
                    )}
            >
                <Icon style={styles.plus} name="plus" />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Content title="Notas" />
                <ProfileMenu />
            </Appbar.Header>
            <ActivityIndicator
                animating={!loadedNotes}
                color={"#695948"}
                size={50}
                style={styles.activityIndicator}
            />
            <ScrollView>
                <View style={{ paddingBottom: 12 }}>
                    {notes.map(note => {
                        return (
                            <TouchableOpacity
                                key={note.id}
                                style={{ ...styles.noteContainer, backgroundColor: note.color }}
                                onLongPress={() => console.log("Eliminar Activado")}
                                onPress={() => {
                                    navigation.navigate(
                                        "Note",
                                        {
                                            id: note.id,
                                            title: note.title,
                                            description: note.description,
                                            color: note.color,
                                            userId: note.userId
                                        }
                                    )
                                }}
                            >
                                <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
                                <Text style={styles.description} numberOfLines={6}>{note.description}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <AddButton />
            <ModalConfirm />
            {route.params !== undefined ? 
                route.params.snackData !== undefined ? <Snack data={route.params.snackData} state={true}/> : false
            : false}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "#fff"
    },
    noteContainer: {
        borderColor: "#d6d6d6",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 15,
        marginHorizontal: 15,
        marginTop: 10,
        padding: 20,
        paddingBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20
    },
    description: {
        fontSize: 14,
    },
    createButton: {
        borderRadius: 100,
        padding: 8,
        backgroundColor: "#695948",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 20,
        right: 20,
        borderColor: "#d6d6d6",
        borderWidth: 0.5,
    },
    plus: {
        fontSize: 45,
        color: "#fff",
    },
    appBar: {
        backgroundColor: "#695948"
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: "50%",
        right: 0,
        left: 0,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 150,
    },
    modalViewConfirm: {
        width: 330,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
});