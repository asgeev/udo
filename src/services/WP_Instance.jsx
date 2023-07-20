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

WP_Instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 403) {
            localStorage.clear()
            window.location.replace('/login')
        }
    }
)

export default WP_Instance
