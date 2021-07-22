import React from 'react';
import { Button } from 'react-native-paper';
import { View, Text, Modal, StyleSheet } from 'react-native';

export default function DeleteModal(props) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.modalState}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text style={styles.confirmText} >¿Estas seguro de eliminar esta nota?</Text>
          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              onPress={() => { props.setModalState(false); }}
              color={"#695948"}
            >No</Button>
            <Button
              mode="outlined"
              onPress={() => { props.deleteNote(); }}
              color={"#695948"}
            >Si</Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  confirmText: {
    marginBottom: 60,
    fontSize: 20,
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 150,
  },
  modalContainer: {
    width: 330,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
})