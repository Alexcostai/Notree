import React from 'react';
import { Button, Divider } from 'react-native-paper';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/User/UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogOutModal(props) {

  const dispatch = useDispatch();

  async function logOut(){
    props.setStateModal(false);
    await AsyncStorage.removeItem('user_session');
    dispatch(loginUser(false));
    console.log("Sesion Cerrada");
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.stateModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalViewConfirm}>
          <Text style={styles.confirmationText} >¿Estas seguro de cerrar sesión?</Text>
          <Divider />
          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              onPress={() => { props.setStateModal(false); }}
              color={"#695948"}
            > No </Button>
            <Button
              mode="outlined"
              onPress={logOut}
              color={"red"}
            > Si </Button>
          </View>
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
  modalViewConfirm: {
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
  confirmationText: {
    marginBottom: 5,
    fontSize: 18,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  }
})