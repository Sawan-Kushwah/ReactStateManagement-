import { useSelector } from 'react-redux';
import { Container } from '../components';

const Home = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn) // react redux

    if (!isLoggedIn) {
        return (
            <div className="w-full min-h-screen">
                <Container>
                    <h1 className="text-2xl font-bold">Welcome to Home Page</h1>
                    <p className="text-lg">No posts found</p>
                    <p className="text-lg">login to see posts</p>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen ">
            <Container>
                <div className='flex flex-wrap'>
                    Go to all post section to see your post
                </div>
            </Container>
        </div>
    )
}

export default Home