import React, { useState } from 'react';
import { Appbar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Menu, { MenuItem } from 'react-native-material-menu';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Share, Text } from 'react-native';

export default function NoteScreen() {

    const NEW_NOTE_ID = -1;
    const route = useRoute();

    const [snackData, setSnackData] = useState("");
    const [modalVisibleColor, setModalVisibleColor] = useState(false);
    const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(route.params.color);
    const [note, setNote] = useState({
        id: route.params.id,
        title: route.params.title,
        description: route.params.description,
        color: route.params.color,
        userId: route.params.userId
    });

    const navigation = useNavigation();

    const handleChangeTitle = (name, value) => {
        setNote({ ...note, [name]: value });
    }

    // INTERN COMPONENTS
    const ModalDelete = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={modalVisibleDelete}>
                <View style={styles.centeredView}>
                    <View style={styles.modalViewDelete}>
                        <Text style={{ marginBottom: 60, fontSize: 20, textAlign: "center" }} >¿Estas seguro de eliminar esta nota?</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Button
                                mode="contained"
                                onPress={() => { setModalVisibleDelete(false); }}
                                color={"#695948"}
                            >
                                No
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => { setModalVisibleDelete(false); removeNote(); }}
                                color={"#695948"}
                            >
                                Si
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const ModalColors = () => {
        const colors = [
            "white", "#d6d6d6", "lightyellow", "#acdce8", "#b3f5c7", "#edae7e", "pink", "#dcbaff"
        ];

        function createBackgroundColors() {
            return (
                colors.map((color, i) => (
                    <TouchableOpacity key={i} onPress={() => { setModalVisibleColor(!modalVisibleColor); setBackgroundColor(color); setNote({ ...note, color: color }) }}>
                        <View style={{ ...styles.colorButton, backgroundColor: color }}>
                            {
                                backgroundColor === color ?
                                    <View>
                                        <Icon style={{ alignSelf: "center", marginTop: 2 }} name="checkmark" size={30} color="black" />
                                        <View style={{ ...styles.colorButton, bottom: 40, right: 5, backgroundColor: "lightgray", opacity: 0.2 }} />
                                    </View>
                                    : false
                            }
                        </View>
                    </TouchableOpacity>
                ))
            )
        }

        return (
            <Modal animationType="slide" transparent={true} visible={modalVisibleColor}>
                <View style={styles.centeredView}>
                    <View style={styles.modalViewColors}>
                        {createBackgroundColors()}
                    </View>
                </View>
            </Modal>
        )
    }

    const MenuBar = () => {
        let _menu = null;
        const setMenuRef = ref => { _menu = ref };
        const hideMenu = () => { _menu.hide() };
        const showMenu = () => { _menu.show() };

        return (
            <Menu
                ref={setMenuRef}
                style={{ marginTop: 40, elevation: 20 }}
                button={<Appbar.Action icon="dots-vertical" onPress={() => showMenu()} />}
            >
                <MenuItem
                    textStyle={{ fontSize: 15 }}
                    onPress={() => { setModalVisibleColor(true); hideMenu(); }}
                >
                    <Text>Colores</Text>
                </MenuItem>
                <MenuItem
                    textStyle={{ fontSize: 15 }}
                    onPress={() => { hideMenu(); setModalVisibleDelete(true); }}
                >
                    <Text>Eliminar</Text>
                </MenuItem>
                <MenuItem
                    textStyle={{ fontSize: 15 }}
                    onPress={() => { hideMenu(); shareNote(); }}
                >
                    <Text>Compartir</Text>
                </MenuItem>
            </Menu>
        )
    }
    // FIN INTERN COMPONENTS


    const addNote = async (note) => {
        if (note.id === NEW_NOTE_ID) {
            if (note.title !== "" || note.description !== "") {
                /* await firebase.db.collection("notes").add({
                    title: note.title,
                    description: note.description,
                    color: note.color,
                    userId: note.userId
                }) */
                navigation.navigate("NoteList", {snackData:"Nota guardada."});
            } else {
                navigation.navigate("NoteList", {snackData:"Nota vacía."});
            }
        } else if(note.title !== route.params.title || note.description !== route.params.description) {
            /* await firebase.db.collection("notes").doc(note.id).update({
                title: note.title,
                description: note.description,
                color: note.color
            }) */
            navigation.navigate("NoteList", {snackData:"Nota actualizada."});
        }

        navigation.navigate("NoteList");
    }

    const removeNote = async () => {
        if (note.id !== NEW_NOTE_ID) {
            // await firebase.db.collection("notes").doc(note.id).delete();
            navigation.navigate("NoteList", {snackData:"Nota eliminada."});
        }
    }

    const shareNote = async () => {
        try {
            const result = await Share.share({
                message:
                    note.title + "\n" + note.description,
            });
            if (result.action === Share.sharedAction) {
                console.log("Sharing");
            } else if(result.action === Share.dismissedAction){
                console.log("Error Sharing");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: backgroundColor }}>
                <Appbar.BackAction onPress={() => { addNote(note); }} />
                <Appbar.Content title="Nota" />
                <MenuBar />
            </Appbar.Header>
            <ScrollView style={{ ...styles.scrollView, backgroundColor: backgroundColor }}>
                <TextInput
                    style={{ ...styles.title }}
                    placeholder="Titulo"
                    maxLength={50}
                    textAlignVertical="top"
                    multiline
                    onChangeText={value => handleChangeTitle("title", value)}
                    value={note.title}
                />
                <View style={styles.innerLine} />
                <TextInput
                    style={{ ...styles.description }}
                    placeholder="Nota"
                    multiline
                    textAlignVertical="top"
                    maxLength={4000}
                    onChangeText={value => handleChangeTitle("description", value)}
                    value={note.description}
                />
                <View style={styles.centeredView}>
                    <ModalColors />
                    <ModalDelete />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: "column",
        alignContent: "center",
        zIndex: -1,
    },
    title: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 22,
        marginBottom: 10,
    },
    description: {
        flex: 1,
        marginHorizontal: 20,
        fontSize: 16,
        marginVertical: 10,
    },
    innerLine: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#969696",
    },
    //MODAL
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 150,
    },
    modalViewColors: {
        width: 330,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    modalViewDelete: {
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
    //FIN MODAL
    colorButton: {
        width: 40,
        height: 40,
        borderColor: "#d6d6d6",
        borderWidth: 1,
        borderRadius: 100,
        margin: 5,
    },

});