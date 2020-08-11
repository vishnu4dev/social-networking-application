import axios from "axios";
import { RegisterSuccess, RegisterFail, setUserDetails, resetUserDetails } from "../actions/authActions";
import {setAlert} from '../actions/alertsActions';
import { URL,config } from "../../config/apiConfig";
import { setAuthToken } from "../../utils/setAuthToken";

export const loadUser=()=>async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const resp = axios.get(`${URL}/auth/`,config);
        dispatch(setUserDetails(resp.data))
    } catch (error) {
        dispatch(resetUserDetails())
    }
}

export const registerUser= (data) => async dispatch =>{
    const {name,email,password} = data;
    try {
        const body = JSON.stringify({name,email,password});
        const resp = await axios.post(`${URL}/user/register`,body,config)
        dispatch(RegisterSuccess(resp.data))
        // dispatch(loadUser())
    } catch (err) {
       if(err.response.data){ 
        const errorsMessages = err.response.data.errors;
        dispatch(RegisterFail())
        if(errorsMessages){
            errorsMessages.forEach(_err => dispatch(setAlert({msg:_err.msg,alertType:'danger'})));
        }}
     else dispatch(setAlert({msg:"Server Error",alertType:'warning'}))   
    }
}