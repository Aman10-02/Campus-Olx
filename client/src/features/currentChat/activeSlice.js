import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friendUser: [{}],
    add: [{}],
}

const activeSlice = createSlice({
    name: "currentChat",
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.friendUser = action.payload.friendUser;
            state.add = action.payload.add;
        },
        setNoCurrentChat: (state) => {
            state.friendUser = {};
            state.add = {};
        }

    },

})

export const { setCurrentChat,setNoCurrentChat } = activeSlice.actions;
export const selectFriendUser = (state) => state.friendUser;
export const selectAdd = (state) => state.add;

export default activeSlice.reducer;