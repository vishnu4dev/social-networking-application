import {SET_ALERT,REMOVE_ALERT} from '../actions/types';


const AlertsInitialState = []
const Alerts = (state = AlertsInitialState, action) => {
    const {type,payload} = action;
    switch (type) {
        case SET_ALERT:
            return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(_alert=> _alert.id !== payload);
        default:
            return state
    }
}

export default Alerts 