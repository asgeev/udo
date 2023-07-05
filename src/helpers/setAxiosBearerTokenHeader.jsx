import WP_Instance from '../services/WP_Instance'

const setAxiosBearerTokenHeader = (token) => {
    WP_Instance.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
    }
}
export default setAxiosBearerTokenHeader
