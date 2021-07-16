import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function Snack(props) {

  const [snackState, setSnackState] = useState(props.state);
  const changeSnackState = () => setSnackState(!snackState);

  return (
    <Snackbar
      style={styles.snackBar}
      visible={snackState}
      onDismiss={changeSnackState}
      duration={2500}
    >
      {props.data}
    </Snackbar>
  )
}

const styles = StyleSheet.create({
  snackBar: {
    backgroundColor: "#695948",
    width: "50%",
    height: "65%",
  },
})