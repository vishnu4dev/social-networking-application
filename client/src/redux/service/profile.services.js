import axios from "axios";
import { URL, config } from "../../config/apiConfig";
import {
  getCurrentProfileSuccess,
  getCurrentProfileFail,
} from "../actions/profileActions";
import {setAlert} from '../actions/alertsActions'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/user/getUserProfile`, config);
    if(res.status === 200){
      dispatch(getCurrentProfileSuccess(res.data));
    }
  } catch (err) {
    dispatch(getCurrentProfileFail());
    if(err.response && err.response.data){const errMsg = err.response.data;
    dispatch(setAlert({msg:errMsg,alertType:'danger'}))}
  }
};
