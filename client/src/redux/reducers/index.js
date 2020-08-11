import { combineReducers } from "redux";
import Alerts from "./alertReducer";
import authReducer from './authReducer';

export default combineReducers({
  Alerts,
  UserLogged:authReducer,
});
