import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import { fetchAllPost, getAllPost, getError, getLoadingState } from '../redux/postSlice';
import { useEffect } from 'react';


const Allpost = () => {
    const dispatch = useDispatch()
    const storePost = useSelector(getAllPost);
    const postLoading = useSelector(getLoadingState);
    const errorInFetching = useSelector(getError);

    useEffect(() => {
        if (storePost.length === 0) {
            dispatch(fetchAllPost());
        }
    }, [dispatch, storePost.length])

    return (

        postLoading ? <h1 className='text-green-500 text-4xl text-center'>Loading post...</h1> :
            errorInFetching ? <h1 className='text-red-500 text-3xl text-center'>{errorInFetching}</h1> :
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {/* storePost.length === 0 ?  */}
                            {storePost.length === 0 ?
                                <h1>NO POST Found</h1> :
                                storePost.map((post) => (
                                    <div key={post.$id} className='p-2 w-1/4'>
                                        <PostCard {...post} />
                                    </div>
                                ))
                            }
                        </div>
                    </Container>
                </div>
    )
}

export default Allpost