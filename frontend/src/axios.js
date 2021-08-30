import axios from 'axios'
import { userConstants } from './constants/userConstants';
import store from './store'

const axiosInstance = axios.create()


// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if(error.response.data.code == 'token_not_valid'){
        var user = JSON.parse(localStorage.getItem('userInfo'));
        const refresh_token = user.refresh;

        const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]));

        const now = Math.ceil(Date.now() / 1000);

        if(tokenParts.exp > now){
            return axiosInstance.post('/api/users/token/refresh/',
                {refresh:refresh_token},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((resp)=>{
                    // console.log(resp.data);
                    // user.refresh = resp.data.refresh;
                    user.token = resp.data.access;
                    user.access = resp.data.access;

                    store.dispatch({
                        type: userConstants.USER_LOGIN_SUCCESS,
                        payload: user
                    })

                    // localStorage.removeItem("userInfo");
                    localStorage.setItem("userInfo",JSON.stringify(user))

                    originalRequest.headers['Authorization'] = `Bearer ${user.token}` 
                    return axiosInstance(originalRequest)
                })
                .catch((err)=>{
                    console.error(err)
                })
        }
        else{
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default axiosInstance