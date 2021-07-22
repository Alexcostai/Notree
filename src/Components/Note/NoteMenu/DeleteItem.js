import { Text } from 'react-native';
import React, { useState } from 'react';
import { MenuItem } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';

import DeleteModal from './DeleteModal';

export default function DeleteItem(props) {

  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);

  const NEW_NOTE_ID = -1;
  const navigation = useNavigation();

  async function deleteNote() {
    if(props.note.id!== NEW_NOTE_ID){
      setModalVisibleDelete(false);
      // await firebase.db.collection("notes").doc(note.id).delete();
      navigation.navigate("NoteListScreen", { snackData: "Nota eliminada." });
    } else{
      navigation.navigate("NoteListScreen", { snackData: "Nota eliminada." });
    }
  }

  return (
    <>
      <MenuItem
        textStyle={{ fontSize: 15 }}
        onPress={() => { setModalVisibleDelete(true); }}
      >
        <Text>Eliminar</Text>
      </MenuItem>
      <DeleteModal
        modalState={modalVisibleDelete}
        setModalState={setModalVisibleDelete}
        deleteNote={deleteNote}
      />
    </>
  )
}
