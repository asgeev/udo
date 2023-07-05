import WP_Instance from '../../services/WP_Instance'

export const Home = () => {
    WP_Instance.get('/wp/v2/posts/').then((response) => console.log(response))

    return <>Home </>
}
