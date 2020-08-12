import { combineReducers } from "redux";
import Alerts from "./alertReducer";
import authReducer from './authReducer';
import profileReducer from "./profileReducer";

export default combineReducers({
  Alerts,
  User:authReducer,
  Profile:profileReducer,
});
