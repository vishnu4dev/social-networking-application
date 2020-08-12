import { GET_PROFILE_SUCCESS, GET_PROFILE_FAILS } from "./types";

export const getCurrentProfileSuccess=(data)=>({
    type:GET_PROFILE_SUCCESS,
    payload:data,
});

export const getCurrentProfileFail=()=>({
    type:GET_PROFILE_FAILS,
});