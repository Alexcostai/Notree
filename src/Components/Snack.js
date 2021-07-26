import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function Snack(props) {

  const changeSnackState = () => props.setSnackState(!props.snackState);

  return (
    <Snackbar
      style={styles.snackBar}
      visible={props.snackState}
      onDismiss={changeSnackState}
      duration={2500}
    >
      <Text>{props.data}</Text>
    </Snackbar>
  )
}

const styles = StyleSheet.create({
  snackBar: {
    backgroundColor: "#695948",
    width: "50%",
  },
})