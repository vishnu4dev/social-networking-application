import { REG_SUCCESS, REG_FAIL, USER_AUTH_SUCCESS, USER_AUTH_FAIL } from "../actions/types";

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
      return {
        ...state,
        ...payload,
        isAuthenticated:true,
        loading:false,
      };
    case REG_FAIL:
    case USER_AUTH_FAIL:
      localStorage.removeItem('token');
        return {
          ...state,
          token:null,
          isAuthenticated:true,
          loading:false,
        }
    default:
      return state;
  }
}