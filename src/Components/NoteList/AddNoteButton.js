import React from 'react'
import Icon from 'react-native-vector-icons/dist/Entypo';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function AddNoteButton() {

  const NEW_NOTE_ID = -1;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => navigation.navigate
        (
          "NoteScreen",
          {
            id: NEW_NOTE_ID,
            title: "",
            description: "",
            color: "white",
          }
        )
      }
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