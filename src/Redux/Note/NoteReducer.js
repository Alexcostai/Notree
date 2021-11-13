const INITIAL_STATE = {
  note: {
    id: -1,
    title: '',
    content: '',
    color: "white"
  }
}

const noteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOAD_NOTE':
      state.note = action.note;
      return { ...state };
    case 'RESET_NOTE':
      state = INITIAL_STATE;
      return { ...state };
    case 'CHANGE_COLOR_NOTE':
      state.note = { ...state.note, color: action.color };
      return { ...state };
    default:
      return state;
  }
}

export default noteReducer