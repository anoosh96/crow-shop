import axios from 'axios'

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
                localStorage.removeItem("userInfo");
                localStorage.setItem("userInfo",JSON.stringify(user))

                originalRequest.headers['Authorization'] = `Bearer ${user.token}` 
                return axiosInstance(originalRequest)
            })
            .catch((err)=>{
                console.error(err)
            })
    }
    return Promise.reject(error);
});

export default axiosInstance