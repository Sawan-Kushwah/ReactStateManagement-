import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import uploadService from '../appwrite/upload'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { deletePostDb, getLoadingState, getPost } from '../redux/postSlice'

const Post = () => {
    const slug = useParams()

    // const post = useSelector(state => console.log(state.post.postList?.documents.find(post => post.$id === slug.slug)))
    const post = useSelector(state => getPost(slug.id)(state))
    const userdata = useSelector(state => state.auth.userData)
    let loading = useSelector(getLoadingState)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    if (!post) return <div>Post not found</div>

    const isAuthor = post && userdata ? post.userId === userdata.$id : false;

    const deletePost = async () => {
        dispatch(deletePostDb(slug.id));
        if (!loading) {
            navigate('/')
        }
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={uploadService.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.slug}/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post