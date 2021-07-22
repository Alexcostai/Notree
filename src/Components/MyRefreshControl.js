import React, {useState} from 'react'
import { RefreshControl } from 'react-native';

import globalStyles from '../GlobalStyles.js';

export default function MyRefreshControl(callback) {
  
  const [refreshState, setRefreshState] = useState(false);

  async function onRefresh(){
    setRefreshState(true);
    await callback();
    setRefreshState(false);
  }
  
  return (
    <RefreshControl onRefresh={onRefresh} refreshing={refreshState} colors={[globalStyles.PRIMARY_APP_COLOR]}/>
  )
}
