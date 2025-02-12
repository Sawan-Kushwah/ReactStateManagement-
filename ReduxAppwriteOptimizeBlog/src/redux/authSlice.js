import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: null
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            try {
                state.isLoggedIn = true;
                state.userData = action.payload;
            } catch (error) {
                console.log("Store :: getUserData :: ", error)
            }
        },
        logout: (state) => {
            try {
                state.isLoggedIn = false,
                    state.userData = null;
            } catch (error) {
                console.log("Store :: getLoginStatus :: ", error)
            }
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;