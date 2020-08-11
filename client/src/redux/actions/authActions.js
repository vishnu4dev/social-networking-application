import {REG_SUCCESS, REG_FAIL} from './types';



export const RegisterSuccess=(data)=>({
    type:REG_SUCCESS,
    payload:data,
})

export const RegisterFail=()=>({
    type: REG_FAIL,
});