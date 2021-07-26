import {combineReducers, createStore} from 'redux';
import noteReducer from './Note/NoteReducer.js';
import userReducer from './User/UserReducer.js';

const rootReducer = combineReducers({
  user: userReducer,
  note: noteReducer,
});

const store = createStore(rootReducer);

export default store