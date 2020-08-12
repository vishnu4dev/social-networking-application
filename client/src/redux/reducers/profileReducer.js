import {GET_PROFILE_FAILS, GET_PROFILE_SUCCESS} from '../actions/types'

const initialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{},
}


export default function(state = initialState ,action){
    const {type,payload} = action;
    switch (type) {
        case GET_PROFILE_SUCCESS:
            return{
                ...state,
                profile:payload,
                loading:false,
            }
        case GET_PROFILE_FAILS:
            return{
                ...state,
                error:payload,
                loading:false,
            }
        default:
            return state;
    }
}