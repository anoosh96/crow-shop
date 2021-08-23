import {userConstants} from '../constants/userConstants'

import axios from 'axios'

export const loginUser = (email,password) => async (dispatch) => {

    dispatch({type:userConstants.USER_LOGIN_REQUEST});

    try {
        const {data} = await axios.post(
            '/api/users/login',
             {'username':email,'password':password},
             {
                 headers: {
                     'Content-Type': 'application/json'
                 }
             }   
        );
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        })    

        localStorage.setItem('userInfo',JSON.stringify(data))
    } 
    catch (error) {
        console.log(error.response);
        dispatch({
            type: userConstants.USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail?
                     error.response.data.detail 
                     : error.message
        })
    }
 }
