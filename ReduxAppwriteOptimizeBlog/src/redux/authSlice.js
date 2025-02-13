import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import authservice from "../appwrite/auth";



export const setCurrentUser = createAsyncThunk('set/loginStatus', async (_, { rejectWithValue }) => {
    try {
        return await authservice.getCurrentUser();
    } catch (error) {
        console.log("Auth slice :: set current user error : ", error);
        return rejectWithValue(error.message || 'Cannot set user');
    }
})

export const loginUser = createAsyncThunk('login/user', async (data, { rejectWithValue }) => {
    try {
        return await authservice.login(data);
    } catch (error) {
        console.log("auth slice :: login user ", error);
        return rejectWithValue(error.message || "something went wrong");
    }
})

export const logoutUser = createAsyncThunk('logout/user', async (_, { rejectWithValue }) => {
    try {
        return await authservice.logout();
    } catch (error) {
        console.log("auth slice :: logout user ", error);
        return rejectWithValue(error.message || "Someting went wrong");
    }
})


export const createUser = createAsyncThunk('create/user', async (data, { rejectWithValue }) => {
    try {
        return authservice.createUser(data);
    } catch (error) {
        console.log("auth slice :: logout user ", error);
        return rejectWithValue(error.message || "Someting went wrong");
    }
})



const initialState = {
    isLoggedIn: false,
    userData: null,
    loading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(setCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(setCurrentUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.error = '';
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(setCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.error = '';
                state.loading = false;
                state.userData = action.payload;
                console.log(action.payload)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.error = '';
                state.loading = false;
                state.userData = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.error = '';
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

// const selectAuth = (state) => state.auth;

export const getUserData = createSelector([state => state.auth], (authState) => authState);
// agar state ki auth wali state change ni hoti h to vo cache wali hi return kr dega 
// isme phela [] it is used to select , ()=>() take the result from first function and reutrn 

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;