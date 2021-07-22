import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Text, StyleSheet } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

//Components
import LogOutModal from './LogOutModal';

export default function ProfileMenu() {

  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [menuRef, setMenuRef] = useState(null);

  const menuButton = <Appbar.Action icon="account-circle" color="white" size={35} onPress={() => showMenu()} />
  const hideMenu = () => {
    menuRef.hide();
    setModalVisibleConfirm(true);
  };
  const showMenu = () => { menuRef.show() };

  return (
    <>
      <Menu
        ref={setMenuRef}
        style={styles.menu}
        button={menuButton}
      >
        <MenuItem
          textStyle={{ fontSize: 15 }}
          onPress={() => { hideMenu() }}
        >
          <Text>Cerrar Sesión</Text>
        </MenuItem>
      </Menu>
      <LogOutModal stateModal={modalVisibleConfirm} setStateModal={setModalVisibleConfirm} />
    </>
  )
}

const styles = StyleSheet.create({
  menu: {
    marginTop: 40, 
    elevation: 20,
  }
})