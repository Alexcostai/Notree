const INITIAL_STATE = {
  note:{
    id:-1,
    title: '',
    description: '',
    color:"white"
  }
}

const noteReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'UPDATE_NOTE':
      state.note = action.note;
      return {...state};
    default:
      return state;
  }
}

export default noteReducer