import axios from 'axios'

const WP_Instance = axios.create({
    baseURL: import.meta.env.VITE_WP_URL,
    withCredentials: true,
})

WP_Instance.interceptors.request.use(function (config) {
    let token = JSON.parse(window.localStorage.getItem('_auth_state')).token
    config.headers['Authorization'] = 'Bearer ' + token
    return config
})

WP_Instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error?.response?.status === 403) {
            localStorage.clear()
            window.location.replace('/login')
        }
        return Promise.reject(error)
    }
)

export default WP_Instance
