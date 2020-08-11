import { REG_SUCCESS, REG_FAIL, USER_AUTH_SUCCESS, USER_AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from "../actions/types";

const intialState ={
token : localStorage.getItem('token'),
isAuthenticated:null,
loading:true,
user:null,
}

export default function(state = intialState, action) {
  const {type,payload} = action
  switch (type) {
    case USER_AUTH_SUCCESS:
    return{
      ...state,
      isAuthenticated:true,
      loading:false,
      user:payload
    }
    case REG_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token',payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated:true,
        loading:false,
      };
    case REG_FAIL:
    case USER_AUTH_FAIL:
    case LOGIN_FAIL:
    case LOG_OUT:
      localStorage.removeItem('token');
        return {
          ...state,
          token:null,
          isAuthenticated:false,
          loading:false,
        }
    default:
      return state;
  }
}