import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILS } from "./types";

export const getCurrentProfileSuccess=(data)=>async dispatch=>({
    type:GET_PROFILE_SUCCESS,
    payload:data,
});

export const getCurrentProfileFail=()=>async dispatch=>({
    type:GET_PROFILE_FAILS,
});