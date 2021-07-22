import React from 'react';
import { Text, Share } from 'react-native';
import { MenuItem } from 'react-native-material-menu';

export default function ShareItem(props) {

  const note = props.note;

  async function shareNote() {
    props.hideMenu();
    if (note.title || note.description) {
      try {
        const result = await Share.share({
          message:
            note.title + "\n" + note.description,
        });
        if (result.action === Share.sharedAction) {
          console.log("Sharing");
        } else if (result.action === Share.dismissedAction) {
          console.log("Error Sharing");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else{
      alert("La nota esta vacia!");
    }
  }

  return (
    <MenuItem
      textStyle={{ fontSize: 15 }}
      onPress={() => { shareNote(); }}
    >
      <Text>Compartir</Text>
    </MenuItem>
  )
}
