import axios from "axios";
import Alerts from "../reducers/alertReducer";
import { RegisterSuccess, RegisterFail } from "../actions/authActions";
import {setAlert} from '../actions/alertsActions';


export const registerUser= (data) => async dispatch =>{
    try {
        const resp = await axios.post('/user/register',data)
        dispatch(RegisterSuccess(resp.data))
    } catch (error) {
        const errorsMessages = error.response.data.errors;
        dispatch(RegisterFail())
        if(errorsMessages){
            errorsMessages.forEach(_err => dispatch(setAlert(_err.msg,'danger')));
        }
    }
}