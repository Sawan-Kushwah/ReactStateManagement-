import { useParams } from 'react-router-dom'
import { PostFrom } from '../components';
import { useSelector } from 'react-redux';
import { getPost } from '../redux/postSlice';

const EditPost = () => {
    const slug = useParams();

    const post = useSelector(state => getPost(slug.id)(state))

    if (!post) return <div>Post not found</div>

    return (
        <div>
            <h1>Edit Post</h1>
            <PostFrom post={post} />
        </div>
    )
}

export default EditPost