import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';

import Client from '../Client.js';
import { useSelector } from 'react-redux';
//Components
import NoteMenu from '../Components/Note/NoteMenu/NoteMenu.js';

export default function NoteScreen() {

  const NEW_NOTE_ID = -1;
  const navigation = useNavigation();
  const note = useSelector(state => state.note.note);

  const [actualNote, setActualNote] = useState({
    id: note.id,
    title: note.title,
    content: note.content,
    color: note.color,
    userId: note.userId
  });

  const handleChangeNote = (name, value) => {
    setActualNote({ ...actualNote, [name]: value });
  }

  async function addNote() {
    if (actualNote.id === NEW_NOTE_ID) {
      if (actualNote.title !== "" || actualNote.content !== "") {
        delete actualNote.id;
        try {
          await Client.addNote({...actualNote, color: note.color});
          navigation.navigate("NoteListScreen", { snackData: "Nota guardada." });
        } catch {
          alert("Error al guardar la nota :(");
        }
      } else {
        navigation.navigate("NoteListScreen", { snackData: "Nota vacía." });
      }
    } else if (
      actualNote.title !== note.title ||
      actualNote.content !== note.content ||
      actualNote.color !== note.color
    ) {
      try {
        await Client.updateNote({...actualNote, color: note.color});
        navigation.navigate("NoteListScreen", { snackData: "Nota actualizada." });
      } catch {
        alert("Error al guardar la nota :(");
      }
    }
    navigation.navigate("NoteListScreen");
  }

  console.log("anashex", note);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: note.color }}>
        <Appbar.BackAction onPress={addNote} />
        <Appbar.Content title="Nota" />
        <NoteMenu />
      </Appbar.Header>
      <ScrollView style={{ ...styles.scrollView, backgroundColor: note.color }}>
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
          style={{ ...styles.content }}
          placeholder="Nota"
          multiline
          textAlignVertical="top"
          maxLength={4000}
          onChangeText={value => handleChangeNote("content", value)}
          value={actualNote.content}
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
  content: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 16,
    marginVertical: 10,
  },
  innerLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#969696",
  },
});