import axios from 'axios'

const WP_Instance = axios.create({
    baseURL: import.meta.env.VITE_WP_URL,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
})

WP_Instance.interceptors.request.use(function (config) {
    let token = JSON.parse(window.localStorage.getItem('_auth_state')).token
    config.headers['Authorization'] = 'Bearer ' + token
    return config
})

export default WP_Instance
