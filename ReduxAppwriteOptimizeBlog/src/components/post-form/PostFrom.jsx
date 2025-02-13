import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import uploadService from '../../appwrite/upload';
import service from '../../appwrite/database';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Input, Button, RTE, Select } from '../index'
import { useNavigate } from 'react-router-dom';
import { addPost, updatePost } from '../../redux/postSlice';

const PostFrom = ({ post }) => {

    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
            featuredImage: post?.featuredImage || ''
        }
    });


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if (post) { // edit
            const file = data.image[0] ? await uploadService.uploadFile(data.image[0]) : null;
            if (file) {
                uploadService.deleteFile(post.featuredImage);
            }

            const dbpost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            dispatch(updatePost(dbpost)) // update post in redux


            if (dbpost) navigate(`/post/${dbpost.slug}/${dbpost.$id}`)
        } else {
            const file = data.image[0] ? await uploadService.uploadFile(data.image[0]) : null;

            if (file) {
                data.featuredImage = file.$id;

                const dbpost = await service.createPost({
                    ...data,
                    userId: userData.$id
                })
                dispatch(addPost(dbpost)) // add post to redux


                if (dbpost) navigate(`/post/${dbpost.slug}/${dbpost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    name="slug"
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly={true}
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={uploadService.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostFrom

PostFrom.propTypes = {
    post: PropTypes.shape({
        $id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        slug: PropTypes.string,
        status: PropTypes.string,
        featuredImage: PropTypes.string,
    })
} 