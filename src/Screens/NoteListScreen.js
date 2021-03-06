import React, { useState, useEffect } from 'react';
import { Appbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Client from '../Client.js'
import { useDispatch } from 'react-redux';
//Components
import Snack from "../Components/Snack";
import MyRefreshControl from '../Components/MyRefreshControl.js';
import ProfileMenu from '../Components/NoteList/ProfileMenu.js';
import AddNoteButton from '../Components/NoteList/AddNoteButton.js';
import { loadNote } from '../Redux/Note/NoteActions.js';

export default function NoteListScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [notes, setNotes] = useState([]);
  const [loadedNotes, setLoadedNotes] = useState(false);
  const [snackState, setSnackState] = useState(false);
  const [snackData, setSnackData] = useState(undefined);

  useEffect(async () => {
    try {
      await getNotes();
    } catch (error) {
      console.log(error);
    }
    setLoadedNotes(true);
    if (route.params) {
      setSnackState(true);
      setSnackData(route.params.snackData);
    }
  }, [route, notes]);

  function showSnack() {
    if (snackData) {
      return <Snack data={snackData} snackState={snackState} setSnackState={setSnackState} />
    }
  }

  function showNotes() {
    if (notes.length !== 0) {
      return (
        notes.map(note => (
          <TouchableOpacity
            key={note.id}
            style={{ ...styles.noteContainer, backgroundColor: note.color }}
            onLongPress={() => console.log("Eliminar Activado")}
            onPress={() => {
              dispatch(loadNote(note));
              navigation.navigate("NoteScreen");
            }}
          >
            <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
            <Text style={styles.content} numberOfLines={6}>{note.content}</Text>
          </TouchableOpacity>
        )
        )
      );
    } else {
      return <Text style={{ ...styles.title, alignSelf: "center", marginTop: 100 }}>No tienes notas!</Text>
    }
  }

  async function getNotes() {
    const res = await Client.getNotes();
    setNotes(res.data.notes);
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
      <ScrollView refreshControl={MyRefreshControl(getNotes)}>
        <View style={{ paddingBottom: 12 }}>
          {showNotes()}
        </View>
      </ScrollView>
      <AddNoteButton />
      {showSnack()}
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
  content: {
    fontSize: 14,
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
});