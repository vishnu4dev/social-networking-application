import { REG_SUCCESS, REG_FAIL } from "../actions/types";


export default function(state = [], action) {
  switch (action.type) {
    case REG_SUCCESS:
      return {
        ...state,
      };
    case REG_FAIL:
        return 
    default:
      return state;
  }
}