import { Text } from 'react-native';
import React, { useState } from 'react';
import { MenuItem } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';

import Client from '../../../Client';
import { useDispatch, useSelector } from 'react-redux';

import DeleteModal from './DeleteModal';
import { resetNote } from '../../../Redux/Note/NoteActions';

export default function DeleteItem() {

  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);

  const NEW_NOTE_ID = -1;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const note = useSelector(state => state.note.note);

  async function deleteNote() {
    if (note.id !== NEW_NOTE_ID) {
      try {
        await Client.removeNote(note.id);
        setModalVisibleDelete(false);
        dispatch(resetNote());
        navigation.navigate("NoteListScreen", { snackData: "Nota eliminada." });
      } catch (error) {
        console.log(error.message);
        alert('Error al eliminar la nota :(');
      }
    } else {
      dispatch(resetNote());
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
