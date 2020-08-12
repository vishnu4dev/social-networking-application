import {REG_SUCCESS, CLEAR_PROFILE,REG_FAIL, USER_AUTH_SUCCESS, USER_AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT} from './types';



export const RegisterSuccess=(data)=>({
    type:REG_SUCCESS,
    payload:data,
})

export const RegisterFail=()=>({
    type: REG_FAIL,
});

export const setUserDetails=(data)=>({
    type:USER_AUTH_SUCCESS,
    payload:data,
})

export const resetUserDetails=()=>({
    type: USER_AUTH_FAIL,
});

export const loginUserSuccess=(data)=>({
    type:LOGIN_SUCCESS,
    payload:data,
})

export const loginUserFail=()=>({
    type: LOGIN_FAIL,
}); 

export const logoutUser=()=>dispatch=>{
    dispatch({type: LOG_OUT});
    dispatch({type: CLEAR_PROFILE});
}

