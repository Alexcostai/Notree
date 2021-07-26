import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';

//Components
import NoteMenu from '../Components/Note/NoteMenu/NoteMenu.js';
import Client from '../Client.js';
import { useSelector } from 'react-redux';

export default function NoteScreen() {

  const NEW_NOTE_ID = -1;
  const navigation = useNavigation();
  const note = useSelector(state => state.note.note)

  const [backgroundColor, setBackgroundColor] = useState(note.color);
  const [actualNote, setActualNote] = useState({
    id: note.id,
    title: note.title,
    description: note.description,
    color: note.color,
    userId: note.userId
  });

  const handleChangeNote = (name, value) => {
    setActualNote({ ...actualNote, [name]: value });
  }

  async function addNote() {
    console.log(actualNote);
    if (actualNote.id === NEW_NOTE_ID) {
      if (actualNote.title !== "" || actualNote.description !== "") {
        try {
          await Client.addNote(actualNote);
          navigation.navigate("NoteListScreen", { snackData: "Nota guardada." });
        } catch {
          alert("Error al guardar la nota :(");
        }
      } else {
        navigation.navigate("NoteListScreen", { snackData: "Nota vacía." });
      }
    } else if (
      actualNote.title !== note.title ||
      actualNote.description !== note.description ||
      actualNote.color !== note.color
    ) {
      try {
        await Client.updateNote(actualNote);
        navigation.navigate("NoteListScreen", { snackData: "Nota actualizada." });
      } catch {
        alert("Error al guardar la nota :(");
      }
    }
    navigation.navigate("NoteListScreen");
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: backgroundColor }}>
        <Appbar.BackAction onPress={addNote} />
        <Appbar.Content title="Nota" />
        <NoteMenu />
      </Appbar.Header>
      <ScrollView style={{ ...styles.scrollView, backgroundColor: backgroundColor }}>
        <TextInput
          style={{ ...styles.title }}
          placeholder="Titulo"
          maxLength={50}
          textAlignVertical="top"
          multiline
          onChangeText={value => handleChangeNote("title", value)}
          value={actualNote.title}
        />
        <View style={styles.innerLine} />
        <TextInput
          style={{ ...styles.description }}
          placeholder="Nota"
          multiline
          textAlignVertical="top"
          maxLength={4000}
          onChangeText={value => handleChangeNote("description", value)}
          value={actualNote.description}
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