import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { RootState } from '../store';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

const api = "http://localhost:5000/api";

// Load User
export const loadUser = () => async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
    try {
      const res = await axios.get(`${api}/user`);
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
};

// Login User
export const login = (
    email: String,
    password: String
    ) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${api}/login`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (error: any) {
        console.error(error)

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const register = (
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    password_confirm: String
    ) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>
        ): Promise<void> => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ first_name, last_name, email, password, password_confirm });

    try {
        const res = await axios.post(`${api}/register`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (error: any) {
        console.error(error)

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// Logout
export const logout = () => ( dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ) => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
}