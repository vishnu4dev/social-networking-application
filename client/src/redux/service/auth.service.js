import axios from "axios";
import { RegisterSuccess, RegisterFail, setUserDetails, resetUserDetails, loginUserSuccess, loginUserFail } from "../actions/authActions";
import {setAlert} from '../actions/alertsActions';
import { URL,config } from "../../config/apiConfig";
import { setAuthToken } from "../../utils/setAuthToken";

export const loadUser=()=>async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const result = await axios.get(`${URL}/auth/`,config);
       if(result.status === 200){
         dispatch(setUserDetails(result.data))
        }
    } catch (error) {
        dispatch(resetUserDetails())
    }
}

export const registerUser= (data) => async dispatch =>{
    const {name,email,password} = data;
    try {
        const body = JSON.stringify({name,email,password});
        const resp = await axios.post(`${URL}/user/register`,body,config)
        if(resp.status === 200){
        dispatch(RegisterSuccess(resp.data))
        dispatch(loadUser())
        dispatch(setAlert({msg:'User Reg.',alertType:'success'}))
         }
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

export const loginUser= (data) => async dispatch =>{
    const {email,password} = data;
    try {
        const body = JSON.stringify({email,password});
        const resp = await axios.post(`${URL}/auth/login`,body,config)
       if(resp.status === 200){ 
        dispatch(loginUserSuccess(resp.data))
        dispatch(loadUser())
    }
    } catch (err) {
       if(err.response.data){ 
        const errorsMessages = err.response.data.errors;
        dispatch(loginUserFail())
        dispatch(setAlert({msg:'Invalid user',alertType:'danger'}));
        if(errorsMessages){
            errorsMessages.forEach(_err => dispatch(setAlert({msg:_err.msg,alertType:'danger'})));
        }}
     else dispatch(setAlert({msg:"Server Error",alertType:'warning'}))   
    }
}