import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';

//Components
import NoteMenu from '../Components/Note/NoteMenu/NoteMenu.js';

export default function NoteScreen() {

  const NEW_NOTE_ID = -1;
  const route = useRoute();

  const [snackData, setSnackData] = useState("");
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

  const addNote = async (note) => {
    if (note.id === NEW_NOTE_ID) {
      if (note.title !== "" || note.description !== "") {
        /* await firebase.db.collection("notes").add({
            title: note.title,
            description: note.description,
            color: note.color,
            userId: note.userId
        }) */
        navigation.navigate("NoteList", { snackData: "Nota guardada." });
      } else {
        navigation.navigate("NoteList", { snackData: "Nota vacía." });
      }
    } else if (note.title !== route.params.title || note.description !== route.params.description) {
      /* await firebase.db.collection("notes").doc(note.id).update({
          title: note.title,
          description: note.description,
          color: note.color
      }) */
      navigation.navigate("NoteList", { snackData: "Nota actualizada." });
    }

    navigation.navigate("NoteList");
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: backgroundColor }}>
        <Appbar.BackAction onPress={() => { addNote(note); }} />
        <Appbar.Content title="Nota" />
        <NoteMenu note={note} />
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
  colorButton: {
    width: 40,
    height: 40,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    borderRadius: 100,
    margin: 5,
  },

});