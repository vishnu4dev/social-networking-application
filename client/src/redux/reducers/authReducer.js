import { REG_SUCCESS, REG_FAIL } from "../actions/types";

const intialState ={
token : localStorage.getItem('token'),
isAuthenticated:null,
loading:true,
user:null,
}

export default function(state = intialState, action) {
  const {type,payload} = action
  switch (type) {
    case REG_SUCCESS:
      localStorage.setItem('token',payload);
      return {
        ...state,
        ...payload,
        isAuthenticated:true,
        loading:false,
      };
    case REG_FAIL:
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