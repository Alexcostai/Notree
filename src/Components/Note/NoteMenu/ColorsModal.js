import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { changeColorNote } from '../../../Redux/Note/NoteActions';

export default function ColorsModal(props) {

  const dispatch = useDispatch();
  const noteBackground = useSelector(state => state.note.color);

  const colors = [
    "white", "#d6d6d6", "lightyellow", "#acdce8", "#b3f5c7", "#edae7e", "pink", "#dcbaff"
  ];

  function createBackgroundColors() {
    return (
      colors.map((color, i) => (
        <TouchableOpacity key={i} onPress={() => { props.setModalState(false); dispatch(changeColorNote(color)); }}>
          <View style={{ ...styles.colorButton, backgroundColor: color }}>
            {
              noteBackground === color ?
                <View>
                  <Icon style={{ alignSelf: "center", marginTop: 2 }} name="checkmark" size={30} color="black" />
                  <View style={{ ...styles.colorButton, bottom: 40, right: 5, backgroundColor: "lightgray", opacity: 0.2 }} />
                </View>
                : false
            }
          </View>
        </TouchableOpacity>
      ))
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.modalState}>
      <View style={styles.centeredView}>
        <View style={styles.modalViewColors}>
          {createBackgroundColors()}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 150,
  },
  modalViewColors: {
    width: 330,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  colorButton: {
    width: 40,
    height: 40,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    borderRadius: 100,
    margin: 5,
  },
})