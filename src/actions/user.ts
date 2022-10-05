import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { RootState } from '../store';
import { loadUser } from './auth';
import {
    HOBBIES_LOADED,
    HOBBY_ADDED,
    ADD_FAIL,
    UPDATE_FAIL,
    HOBBY_UPDATE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    ERROR_LOAD,
    HOBBY_DELETED
} from './types';

const api = "http://localhost:5000/api";

export const addHobby = (name: string, description: string, img: string) => 
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ name, description, img });

    
        try {
            const res = await axios.post(`${api}/hobby`, body, config);
  
            dispatch({
                type: HOBBY_ADDED,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: ADD_FAIL
            });
        }
}

export const updateProfile = (first_name: string, last_name: string, introduction: string) => 
async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ first_name, last_name, introduction });

    try {
        const res = await axios.put(`${api}/user/profile/`, body, config);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: res.data
        });

        loadUser();

    } catch (error) {
        dispatch({
            type: UPDATE_FAIL
        });
    }

}

export const updateHobby = (id: number, name: string, description: string, img: string) => 
async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, description, img });

    try {
        const res = await axios.put(`${api}/hobby/${id}`, body, config);

        dispatch({
            type: HOBBY_UPDATE_SUCCESS,
            payload: res.data
        });

        getUserHobbies();

    } catch (error) {
        dispatch({
            type: UPDATE_FAIL
        });
    }
    
}

export const getUserHobbies = () => async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> => {
    try {
        const res: any = await axios.get(`${api}/hobby`);

        dispatch({
            type: HOBBIES_LOADED,
            payload: res.data
    });
    } catch (error) {
        dispatch({
            type: ERROR_LOAD
        });
    }
}

export const deleteHobby = (id: number) => async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ): Promise<void> =>{
    try {
        const res: any = await axios.put(`${api}/hobby/del/${id}`);

        dispatch({
            type: HOBBY_DELETED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR_LOAD
        });
    }

}