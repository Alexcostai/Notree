import React from 'react'
import Icon from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetNote } from '../../Redux/Note/NoteActions';

export default function AddNoteButton() {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => ( dispatch(resetNote()), navigation.navigate("NoteScreen"))}
    >
      <Icon style={styles.plus} name="plus" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
})