import React, { useState, useEffect } from 'react';
import { Appbar, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Client from '../Client.js'
//Components
import Snack from "../Components/Snack";
import MyRefreshControl from '../Components/MyRefreshControl.js';
import ProfileMenu from '../Components/NoteList/ProfileMenu.js';
import AddNoteButton from '../Components/NoteList/AddNoteButton.js';

export default function NoteListScreen() {

  const route = useRoute();
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);
  const [loadedNotes, setLoadedNotes] = useState(false);

  useEffect(async () => {
    try {
      const res = await Client.getNotes();
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoadedNotes(true);
  }, []);

  function showSnack() {
    if (route.params && route.params.snackData) {
      return <Snack data={route.params.snackData} state={true} />
    }
  }

  function showNotes() {
    notes.map(note => {
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
    })
  }

  function onRefresh(){
    console.log("hola");
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
      <ScrollView refreshControl={MyRefreshControl(onRefresh)}>
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
  description: {
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