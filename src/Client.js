import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

http.interceptors.request.use(
  async (req) => {
    req.headers['x-access-token'] = await AsyncStorage.getItem('user_session');
    return req;
  },
  error => {
    return Promise.reject(error)
  }
)

const signin = (user) => {
  return http.post("/signin", user);
}

const signup = (user) => {
  return http.post("/signup", user);
}

const recoverPassword = () => {
  return http.post("/user/password/recover");
}

const resetPassword = (password) => {
  return http.post("/user/password/reset", password);
}

const changePassword = (passwords) => {
  return http.post("/user/password/change", passwords);
}

const getNotes = () => {
  return http.get("/note");
}

const addNote = (note) => {
  return http.post("/note", note);
}

const updateNote = (note) => {
  return http.post("/note/update", note);
}

const removeNote = (noteId) => {
  return http.post("/note/remove", noteId);
}


export default { signin, signup, recoverPassword, resetPassword, changePassword, getNotes, addNote, updateNote, removeNote };