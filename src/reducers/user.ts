import { 
    USER_LOADED,
    AUTH_ERROR, 
    USER_UPDATED,
    HOBBY_UPDATE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    HOBBIES_LOADED,
    HOBBY_ADDED,
    ERROR_LOAD,
    HOBBY_DELETED
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

interface Action {
    type: string
    payload?: any
}

export default function(state = initialState, action: Action) {
    const { type, payload } = action;

    switch(type){
        case USER_UPDATED:
        case USER_LOADED:
        case HOBBY_UPDATE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
        case HOBBY_ADDED:
        case HOBBY_DELETED:
        case HOBBIES_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
 }