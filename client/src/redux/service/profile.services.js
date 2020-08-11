import  axios from "axios";
import { URL, config } from "../../config/apiConfig";
import { getCurrentProfileSuccess, getCurrentProfileFail } from "../actions/profileActions";


export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res= await axios.get(`${URL}/user/setProfile`,config);
        dispatch(getCurrentProfileSuccess(res.data))
    } catch (error) {
        dispatch(getCurrentProfileFail())  ;
    }
}