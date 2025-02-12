import PropTypes from 'prop-types'
import uploadService from '../appwrite/upload'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage, slug }) => {
    return (
        <Link to={`/post/${slug}/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={uploadService.filePreview(featuredImage)} alt={title}
                        className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold text-black'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    slug: PropTypes.string
}