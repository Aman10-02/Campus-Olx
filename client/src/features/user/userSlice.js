import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    googleId: "",
    name: "",
    photo: "",
    isAdmin: null,
    favourite: [{}],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.googleId = action.payload.googleId;
            state.name = action.payload.name;
            state.photo = action.payload.photo;
            state.isAdmin = action.payload.isAdmin;
            state.favourite = action.payload.favourite;
        },
        setSignOut: (state) => {
            state.googleId = null;
            state.name = null;
            state.photo = null;
            state.isAdmin = null;
            state.favourite = null;
        }

    },

})

export const { setUserLogin,setSignOut } = userSlice.actions;
export const selectUserGoogleId = (state) => state.user.googleId;
export const selectUserName = (state) => state.user.name;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserAdmin = (state) => state.user.isAdmin;
export const selectUserFavourite = (state) => state.user.favourite;

export default userSlice.reducer;