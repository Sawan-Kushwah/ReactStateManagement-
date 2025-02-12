import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import service from "../appwrite/database";

export const fetchAllPost = createAsyncThunk('post/fetchAllPost', async (_, { rejectWithValue }) => {
    try {
        return await service.getAllPost();
    } catch (error) {
        console.error("PostSlice :: fetchAllPost error ::", error);
        return rejectWithValue(error.message || "Failed to fetch posts");
    }
});

export const deletePostDb = createAsyncThunk('post/deletePost', async (id, { rejectWithValue }) => {
    try {
        await service.deletePost(id);
        return id;
    } catch (err) {
        console.log("delete post error : ", err);
        return rejectWithValue(err.message || "failed to delete ")
    }
})

const initialState = { loading: true, postList: [], error: '' };

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.postList.documents.push(action.payload);
        },
        updatePost: (state, action) => {
            const index = state.postList.documents.findIndex(post => post.$id === action.payload.$id)
            if (index != -1) {
                state.postList.documents[index] = action.payload;
            }
        },
        // deleteStorePost: (state, action) => {
        //     state.postList.documents = state.postList.documents.filter(post => post.$id !== action.payload.$id);
        // }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPost.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchAllPost.fulfilled, (state, action) => {
                state.loading = false;
                state.postList = action.payload;
            })
            .addCase(fetchAllPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            })
            .addCase(deletePostDb.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePostDb.fulfilled, (state, action) => {
                state.loading = false;
                state.postList.documents = state.postList.documents.filter((post) => post.$id !== action.payload);
            })
            .addCase(deletePostDb.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            })
    }
});

const selectPostList = (state) => state.post?.postList?.documents ?? [];
export const getPost = (slugID) => createSelector([selectPostList], posts => posts.find(post => post.$id === slugID))

export const getLoadingState = createSelector([state => state.post?.loading], loading => loading);
export const getError = createSelector([state => state.post?.error], err => err) || "Something went wrong";
export const getAllPost = createSelector([selectPostList], posts => posts)

export const { addPost, updatePost } = postSlice.actions;
export default postSlice.reducer;