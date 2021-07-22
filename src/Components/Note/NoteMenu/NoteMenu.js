import React, {useState} from 'react';
import { Appbar } from 'react-native-paper';
import Menu from 'react-native-material-menu';

//Menu Items
import ShareItem from './ShareItem';
import DeleteItem from './DeleteItem';
import ColorsItem from './ColorsItem';

export default function NoteMenu(props) {

  const menuButton = <Appbar.Action icon="dots-vertical" onPress={() => showMenu()} />
  const [menuRef, setMenuRef] = useState(null);

  const hideMenu = () => { menuRef.hide() };
  const showMenu = () => { menuRef.show() };

  return (
    <Menu
      ref={setMenuRef}
      style={{ marginTop: 40, elevation: 20 }}
      button={menuButton}
    >
      <ColorsItem hideMenu={hideMenu} note={props.note}/>
      <ShareItem hideMenu={hideMenu} note={props.note}/>
      <DeleteItem note={props.note}/>
    </Menu>
  )
}
