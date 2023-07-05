import axios from 'axios'

const WP_Instance = axios.create({
    baseURL: import.meta.env.VITE_WP_URL,
    timeout: 8000,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
})

export default WP_Instance
