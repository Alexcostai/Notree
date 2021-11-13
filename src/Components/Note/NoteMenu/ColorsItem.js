import React, {useState} from 'react'
import { Text } from 'react-native';
import { MenuItem } from 'react-native-material-menu';
import ColorsModal from './ColorsModal';

export default function ColorsItem() {

  const [modalVisibleColor, setModalVisibleColor] = useState(false);

  return (
    <>
    <MenuItem textStyle={{ fontSize: 15 }}
      onPress={() => { setModalVisibleColor(true); }}
    >
      <Text>Colores</Text>
    </MenuItem>
    <ColorsModal modalState={modalVisibleColor} setModalState={setModalVisibleColor} />
    </>
  )
}
