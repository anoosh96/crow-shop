import {userConstants} from '../constants/userConstants'

import axios from 'axios'

export const loginUser = (email,password) => async (dispatch) => {

    dispatch({type:userConstants.USER_LOGIN_REQUEST});

    try {
        const {data} = await axios.post(
            '/api/users/login/',
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

 
export const registerUser = (name,email,password,confirmPassword) => async (dispatch) => {

    dispatch({type:userConstants.USER_REGISTER_REQUEST});

    try {
        const {data} = await axios.post(
            '/api/users/register/',
             {'first_name': name, 'username':email,'password':password,'password2':confirmPassword},
             {
                 headers: {
                     'Content-Type': 'application/json'
                 }
             }   
        );
        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: data
        })
        
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
    } 
    catch (error) {
        console.log(error.response);
        dispatch({
            type: userConstants.USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail?
                     error.response.data.detail 
                     : error.message
        })
    }
 }

 export const logoutUser = () => (dispatch) => {
     localStorage.removeItem('userInfo'); 
     dispatch({type:userConstants.USER_LOGOUT})
 }


 export const getUserDetails = (id) => async (dispatch,getState) => {

    dispatch({type:userConstants.USER_DETAILS_REQUEST});

    const {userLogin:{userInfo}} = getState()

    try {
        const {data} = await axios.get(
            `/api/users/${id}`,
            {
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${userInfo.token} `

                }
            }
        );
        dispatch({
            type: userConstants.USER_DETAILS_SUCCESS,
            payload: data
        })

    } 
    catch (error) {
        console.log(error.response);
        dispatch({
            type: userConstants.USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail?
                     error.response.data.detail 
                     : error.message
        })
    }
 }


 export const updateUserProfile = (user) => async (dispatch,getState) => {

    dispatch({type:userConstants.USER_UPDATE_REQUEST});

    const {userLogin:{userInfo}} = getState()

    try {
        const {data} = await axios.put(
            `/api/users/profile/update`,
            user,
            {
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${userInfo.token} `

                }
            }
        );
        dispatch({
            type: userConstants.USER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))


    } 
    catch (error) {
        console.log(error.response);
        dispatch({
            type: userConstants.USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail?
                     error.response.data.detail 
                     : error.message
        })
    }
 }